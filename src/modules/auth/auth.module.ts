import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { LoginSecurityService } from './login-security.service';
import { SmsService } from './sms.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret',
            signOptions: { expiresIn: '8h' },
        }),
    ],
    providers: [AuthService, PrismaService, JwtStrategy, LoginSecurityService, SmsService, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthService, LoginSecurityService, JwtAuthGuard],
})
export class AuthModule {}
