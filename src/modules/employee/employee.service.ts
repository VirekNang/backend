import { Injectable, NotFoundException } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.employee.findMany({
            orderBy: { EmployeeID: 'desc' }
        });
    }

    GetById(id: string) {
        return this.prisma.employee.findUnique({ where: { uuid: id } });
    }

    private async saveFile(part: any): Promise<string> {
        if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
        return filename;
    }

    async Create(request: FastifyRequest) {
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
            data = request.body || {};
        }

        const isActive = data.IsActive === 'true' || data.IsActive === true;

        try {
            const lastEmployee = await this.prisma.employee.findFirst({
                orderBy: { EmployeeID: 'desc' }
            });

            const nextId = lastEmployee ? lastEmployee.EmployeeID + 1 : 1;
            const employeeNo = data.EmployeeNo || `EMP-${String(nextId).padStart(4, '0')}`;
            
            const employee = await this.prisma.employee.create({
                data: {
                    EmployeeNo:        employeeNo,
                    EmployeeName:      data.EmployeeName || 'New Employee',
                    Gender:            data.Gender || 'Other',
                    DateOfBirth:       data.DateOfBirth ? new Date(data.DateOfBirth) : new Date(),
                    Indentity:         data.Indentity ? parseInt(data.Indentity, 10) : null,
                    Phone:             data.Phone || '',
                    EducationStatus:   data.EducationStatus || '',
                    Address:           data.Address || '',
                    Department:        data.Department || 'Staff',
                    Position:          data.Position || 'Staff',
                    HiredDate:         data.HiredDate ? new Date(data.HiredDate) : new Date(),
                    BaseSalary:        data.BaseSalary ? parseFloat(data.BaseSalary) : 0,
                    PhotoURL:          filename || data.PhotoURL || 'default.png',
                    IsActive:          isActive,
                    IsDelete:          null,
                },
            });
            return { message: 'Employee created successfully', data: employee };
        } catch (error) {
            if (filename) {
                const filepath = path.join(process.cwd(), 'uploads', filename);
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
            }
            throw error;
        }
    }

    async Update(id: string, request: FastifyRequest) {
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
            data = request.body || {};
        }

        const employee = await this.prisma.employee.findUnique({ where: { uuid: id } });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const updateData: any = {};
        if (data.EmployeeName !== undefined) updateData.EmployeeName = data.EmployeeName;
        if (data.Gender !== undefined) updateData.Gender = data.Gender;
        if (data.DateOfBirth) updateData.DateOfBirth = new Date(data.DateOfBirth);
        if (data.Indentity !== undefined && data.Indentity !== '') updateData.Indentity = parseInt(data.Indentity, 10);
        if (data.Phone !== undefined) updateData.Phone = data.Phone;
        if (data.EducationStatus !== undefined) updateData.EducationStatus = data.EducationStatus;
        if (data.Address !== undefined) updateData.Address = data.Address;
        if (data.Department !== undefined) updateData.Department = data.Department;
        if (data.Position !== undefined) updateData.Position = data.Position;
        if (data.HiredDate) updateData.HiredDate = new Date(data.HiredDate);
        if (data.BaseSalary !== undefined && data.BaseSalary !== '') updateData.BaseSalary = parseFloat(data.BaseSalary);
        if (data.IsActive !== undefined) updateData.IsActive = data.IsActive === 'true' || data.IsActive === true;

        if (filename) {
            updateData.PhotoURL = filename;
        } else if (data.PhotoURL !== undefined) {
            updateData.PhotoURL = data.PhotoURL;
        }

        try {
            const updatedEmployee = await this.prisma.employee.update({
                where: { uuid: id },
                data: updateData,
            });

            if (filename && employee.PhotoURL && employee.PhotoURL.trim().toLowerCase() !== 'default.png') {
                const oldFilePath = path.join(process.cwd(), 'uploads', employee.PhotoURL);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            return { message: 'Employee updated successfully', data: updatedEmployee };
        } catch (error) {
            if (filename) {
                const filepath = path.join(process.cwd(), 'uploads', filename);
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
            }
            throw error;
        }
    }

    async Delete(id: string) {
        const employee = await this.prisma.employee.findUnique({ where: { uuid: id } });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const deletedEmployee = await this.prisma.employee.delete({
            where: { uuid: id },
        });

        if (employee.PhotoURL && employee.PhotoURL.trim().toLowerCase() !== 'default.png') {
            const filepath = path.join(process.cwd(), 'uploads', employee.PhotoURL);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }

        return { message: 'Employee deleted successfully', data: deletedEmployee };
    }
}
