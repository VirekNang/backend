import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import type { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import {
  CreatePermissionDto,
  CreateAuditLogDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly systemPermissions = ['salescreen', 'pos', 'menu', 'orders', 'inventory', 'reports', 'accounting', 'users'];

  private async syncAdministratorPermissions(userId: number, isAdmin: boolean) {
    await this.prisma.userPermission.deleteMany({
      where: { UserID: userId, PermissionName: { in: this.systemPermissions } },
    });
    if (isAdmin) {
      await this.prisma.userPermission.createMany({
        data: this.systemPermissions.map((PermissionName) => ({ UserID: userId, PermissionName })),
      });
    }
  }

  private async saveFile(part: any): Promise<string> {
    if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
    const ext = part.filename.split('.').pop();
    const filename = `${Date.now()}.${ext}`;
    await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
    return filename;
  }

  async createUser(request: FastifyRequest) {
    let data: any = {};
    let filename = '';

    if (request.isMultipart()) {
      for await (const part of request.parts()) {
        if (part.type === 'field') {
          data[part.fieldname] = part.value;
        } else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
          filename = await this.saveFile(part);
        }
      }
    } else {
      data = (request.body as any) || {};
    }

    const userId = parseInt(data.UserID);
    if (isNaN(userId)) {
      throw new NotFoundException('UserID must be a valid number matching an existing Employee');
    }

    // Check if employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { EmployeeID: userId },
    });
    if (!employee) {
      if (filename) {
        const filepath = path.join(process.cwd(), 'uploads', filename);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      }
      throw new NotFoundException(`Employee with ID ${userId} not found`);
    }

    const image = filename || data.Image || employee.PhotoURL || 'default.png';

    const rawPassword = (data.Password || '').trim();
    if (!rawPassword) {
      throw new Error('Password is required when creating a user account');
    }
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    try {
      const isAdmin = data.IsAdmin === 'true' || data.IsAdmin === true;
      const createdUser = await this.prisma.users.create({
        data: {
          UserID: userId,
          Username: data.Username,
          Password: hashedPassword,
          Email: data.Email,
          Phone: data.Phone || '',
          Image: image,
          IsAdmin: isAdmin,
          IsActive: data.IsActive === undefined ? true : (data.IsActive === 'true' || data.IsActive === true),
          IsDuDate: data.IsDuDate ? new Date(data.IsDuDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          IsDelete: false,
        },
      });
      await this.syncAdministratorPermissions(createdUser.UserID, isAdmin);
      return this.findOne(createdUser.uuid);
    } catch (error) {
      if (filename) {
        const filepath = path.join(process.cwd(), 'uploads', filename);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.users.findMany({
      include: {
        Permissions: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { uuid: id },
      include: {
        Permissions: true,
      },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async updateUser(id: string, request: FastifyRequest) {
    const user = await this.prisma.users.findUnique({
      where: { uuid: id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    let data: any = {};
    let filename = '';

    if (request.isMultipart()) {
      for await (const part of request.parts()) {
        if (part.type === 'field') {
          data[part.fieldname] = part.value;
        } else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
          filename = await this.saveFile(part);
        }
      }
    } else {
      data = (request.body as any) || {};
    }

    const updateData: any = {};
    if (data.Username !== undefined) updateData.Username = data.Username;
    if (data.Email !== undefined) updateData.Email = data.Email;
    if (data.Phone !== undefined) updateData.Phone = data.Phone;
    
    if (data.Password !== undefined && data.Password.trim() !== '') {
      updateData.Password = await bcrypt.hash(data.Password.trim(), 10);
    }
    
    if (filename) {
      updateData.Image = filename;
    } else if (data.Image !== undefined) {
      updateData.Image = data.Image;
    }

    if (data.IsAdmin !== undefined) {
      updateData.IsAdmin = data.IsAdmin === 'true' || data.IsAdmin === true;
    }
    if (data.IsActive !== undefined) {
      updateData.IsActive = data.IsActive === 'true' || data.IsActive === true;
    }
    if (data.IsDuDate !== undefined) {
      updateData.IsDuDate = new Date(data.IsDuDate);
    }
    if (data.IsDelete !== undefined) {
      updateData.IsDelete = data.IsDelete === 'true' || data.IsDelete === true;
    }

    try {
      const updatedUser = await this.prisma.users.update({
        where: { uuid: id },
        data: updateData,
        include: { Permissions: true },
      });

      if (data.IsAdmin !== undefined) await this.syncAdministratorPermissions(user.UserID, updatedUser.IsAdmin);

      // If we successfully updated to a new photo and had an old one (which isn't default.png), delete the old one
      if (filename && user.Image && user.Image.trim().toLowerCase() !== 'default.png') {
        // Also ensure the old image is not shared with the employee's PhotoURL
        const employee = await this.prisma.employee.findUnique({
          where: { EmployeeID: user.UserID },
        });
        if (!employee || employee.PhotoURL !== user.Image) {
          const oldFilePath = path.join(process.cwd(), 'uploads', user.Image);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
      }

      return updatedUser;
    } catch (error) {
      if (filename) {
        const filepath = path.join(process.cwd(), 'uploads', filename);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      }
      throw error;
    }
  }

  async deleteUser(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { uuid: id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const deletedUser = await this.prisma.users.delete({
      where: { uuid: id },
    });

    if (user.Image && user.Image.trim().toLowerCase() !== 'default.png') {
      // Ensure the user's image is not shared with the employee's PhotoURL
      const employee = await this.prisma.employee.findUnique({
        where: { EmployeeID: user.UserID },
      });
      if (!employee || employee.PhotoURL !== user.Image) {
        const filepath = path.join(process.cwd(), 'uploads', user.Image);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    }

    return deletedUser;
  }


  async addPermission(dto: CreatePermissionDto) {
    const existing = await this.prisma.userPermission.findFirst({
      where: { UserID: dto.UserID, PermissionName: dto.PermissionName },
    });
    return existing ?? this.prisma.userPermission.create({ data: dto });
  }

  async listPermissions(userId: number) {
    return this.prisma.userPermission.findMany({
      where: { UserID: userId },
    });
  }

  async removePermission(id: number) {
    return this.prisma.userPermission.delete({
      where: { UserPermissionID: id },
    });
  }

  /* ---------- Audit Logs ---------- */
  async createLog(dto: CreateAuditLogDto) {
    // return this.prisma.auditLog.create({
    //   data: dto,
    // });
    return null;
  }

  async listLogs(filter?: { userId?: number; tableName?: string }) {
    // const where: any = {};
    // if (filter?.userId) where.UserID = filter.userId;
    // if (filter?.tableName) where.TableName = filter.tableName;
    // 
    // return this.prisma.auditLog.findMany({
    //   where,
    //   include: { User: { select: { Username: true } } },
    //   orderBy: { CreatedDate: 'desc' },
    // });
    return [];
  }

  async initFirstAdmin() {
    try {
      const email = 'avery@umberandash.com';
      const password = '123456789';
      const hashedPassword = await bcrypt.hash(password, 10);

      let employee = await this.prisma.employee.findFirst({ where: { EmployeeName: 'Avery Admin' } });
      if (!employee) {
        employee = await this.prisma.employee.create({
          data: {
            EmployeeNo: 'EMP-0001',
            EmployeeName: 'Avery Admin',
            Gender: 'Male',
            DateOfBirth: new Date('1990-01-01T00:00:00Z'),
            Phone: '855123456789',
            EducationStatus: 'Bachelor',
            Address: 'Phnom Penh',
            Department: 'Management',
            Position: 'Admin',
            HiredDate: new Date(),
            BaseSalary: 1000.0,
            PhotoURL: 'default.png',
            IsActive: true,
          },
        });
      }

      const existingUser = await this.prisma.users.findUnique({ where: { UserID: employee.EmployeeID } });
      if (!existingUser) {
        const u = await this.prisma.users.create({
          data: {
            UserID: employee.EmployeeID,
            Username: 'avery',
            Email: email,
            Password: hashedPassword,
            Phone: '855123456789',
            Image: 'default.png',
            IsAdmin: true,
            IsActive: true,
            IsDuDate: new Date('2030-01-01T00:00:00Z'),
          },
        });
        // Add cashier access
        await this.prisma.userPermission.create({
          data: {
            UserID: u.UserID,
            PermissionName: 'CASHIER_ACCESS'
          }
        });
        return { message: 'Admin user created successfully', email, password };
      } else {
        await this.prisma.users.update({
          where: { UserID: employee.EmployeeID },
          data: { 
            Password: hashedPassword, 
            Email: email, 
            IsAdmin: true,
            IsActive: true 
          }
        });
        return { message: 'Admin user already exists. Password reset.', email, password };
      }
    } catch (error: any) {
      console.error(error);
      require('fs').writeFileSync('init-error.log', error.message + '\n' + error.stack);
      return { message: 'Init failed', error: error.message };
    }
  }
}
