import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { AuthService, TokenPayload } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true;
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) throw new UnauthorizedException('Login is required');

    try {
      const payload = await this.authService.verifyToken(authorization.slice(7));
      const user = await this.authService.validateSession(payload);
      if (!user) throw new UnauthorizedException('Your session has expired. Please log in again.');
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Your session has expired. Please log in again.');
    }
  }
}
