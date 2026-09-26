import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreatePermissionDto,
  CreateAuditLogDto,
} from './dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { Public } from '../public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* ---------- Users ---------- */
  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        UserID: { type: 'number', description: 'Must match an existing EmployeeID' },
        Username: { type: 'string' },
        Password: { type: 'string' },
        Email: { type: 'string' },
        Phone: { type: 'string' },
        Image: { type: 'string', format: 'binary', description: 'Upload file or pass string value' },
        IsAdmin: { type: 'boolean', default: false },
        IsActive: { type: 'boolean', default: true },
        IsDuDate: { type: 'string', format: 'date-time' },
        IsDelete: { type: 'boolean', default: false }
      },
      required: ['UserID', 'Username', 'Password', 'Email', 'Phone', 'IsDuDate']
    }
  })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  create(@Req() request: FastifyRequest) {
    return this.usersService.createUser(request);
  }

  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  /* ---------- Permissions (must be BEFORE :id wildcard) ---------- */
  @Post('permissions')
  addPermission(@Body() dto: CreatePermissionDto) {
    return this.usersService.addPermission(dto);
  }

  @Get('permissions/:userId')
  listPermissions(@Param('userId') userId: number) {
    return this.usersService.listPermissions(userId);
  }

  @Delete('permissions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removePermission(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removePermission(id);
  }

  /* ---------- Single user (wildcard :id must be LAST) ---------- */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        Username: { type: 'string' },
        Password: { type: 'string' },
        Email: { type: 'string' },
        Phone: { type: 'string' },
        Image: { type: 'string', format: 'binary', description: 'Upload file or pass string value' },
        IsAdmin: { type: 'boolean' },
        IsActive: { type: 'boolean' },
        IsDuDate: { type: 'string', format: 'date-time' },
        IsDelete: { type: 'boolean' }
      }
    }
  })
  update(@Param('id') id: string, @Req() request: FastifyRequest) {
    return this.usersService.updateUser(id, request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  /* ---------- Audit Logs ---------- */
  @Post('audit')
  createLog(@Body() dto: CreateAuditLogDto) {
    return this.usersService.createLog(dto);
  }

  @Get('audit')
  listLogs(@Query('userId') userId?: number, @Query('tableName') tableName?: string) {
    return this.usersService.listLogs({ userId, tableName });
  }

  /* ---------- Initialization (Dev Use Only) ---------- */
  @Post('init')
  @Public()
  async initAdmin() {
    const bcrypt = require('bcrypt');
    const hashed = await bcrypt.hash('123456789', 10);
    // update ALL users with avery@umberandash.com
    const result = await this.usersService['prisma'].users.updateMany({
      where: { Email: 'avery@umberandash.com' },
      data: { 
         Password: hashed,
         PinCode: '444444',
         Phone: '012345678'
      }
    });
    return { message: 'Admin account reset', count: result.count };
  }

  @Get('debug')
  @Public()
  async debugUsers() {
    await this.usersService['prisma'].device.deleteMany();
    await this.usersService['prisma'].deviceVerificationRequest.deleteMany();
    return { message: 'All devices and verification requests cleared' };
  }
}
