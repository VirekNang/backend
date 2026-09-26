import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { FastifyRequest } from 'fastify';

type LoginResult = { userId?: number; userType: 'admin' | 'app'; email: string; success: boolean; failureReason?: string };

@Injectable()
export class LoginSecurityService {
  private readonly logger = new Logger(LoginSecurityService.name);
  constructor(private readonly prisma: PrismaService) {}

  async recordLogin(result: LoginResult, request: FastifyRequest): Promise<void> {
    const ipAddress = this.getIpAddress(request);
    const location = this.getBrowserLocation(request) ?? await this.getLocation(ipAddress);
    const userAgent = String(request.headers['user-agent'] ?? '').slice(0, 500);
    await this.prisma.loginActivity.create({
      data: { UserID: result.userId, UserType: result.userType, Email: result.email.toLowerCase(), Success: result.success, IPAddress: ipAddress, UserAgent: userAgent || null, Location: location, FailureReason: result.failureReason },
    });
    if (result.success) void this.sendTelegramAlert({ ...result, ipAddress, location, userAgent });
  }

  async summary() {
    const [total, successful, failed, recent] = await Promise.all([
      this.prisma.loginActivity.count(),
      this.prisma.loginActivity.count({ where: { Success: true } }),
      this.prisma.loginActivity.count({ where: { Success: false } }),
      this.prisma.loginActivity.findMany({ orderBy: { CreatedAt: 'desc' }, take: 50 }),
    ]);
    return { total, successful, failed, recent };
  }

  private getIpAddress(request: FastifyRequest): string | null {
    const forwarded = request.headers['x-forwarded-for'];
    const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return (value?.split(',')[0].trim() || request.ip || null)?.slice(0, 64) ?? null;
  }

  private async getLocation(ip: string | null): Promise<string | null> {
    if (!ip || process.env.LOGIN_GEOLOCATION_ENABLED !== 'true') return null;

    let resolvedIp = ip;

    // When running on localhost, fetch the real public IP
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2500) });
        const ipData = await ipRes.json() as { ip?: string };
        if (ipData.ip) resolvedIp = ipData.ip;
      } catch {
        return null; // Can't reach internet to get public IP
      }
    }

    try {
      const response = await fetch(`https://ipwho.is/${encodeURIComponent(resolvedIp)}`, { signal: AbortSignal.timeout(2500) });
      const data = await response.json() as { success?: boolean; city?: string; region?: string; country?: string };
      return data.success === false ? null : [data.city, data.region, data.country].filter(Boolean).join(', ').slice(0, 250) || null;
    } catch {
      return null;
    }
  }

  private getBrowserLocation(request: FastifyRequest): string | null {
    const value = request.headers['x-login-location'];
    const location = Array.isArray(value) ? value[0] : value;
    if (!location || !/^-?\d{1,2}(?:\.\d+)?,-?\d{1,3}(?:\.\d+)?$/.test(location)) return null;
    const [latitude, longitude] = location.split(',').map(Number);
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return null;
    return `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  }

  private async sendTelegramAlert(data: LoginResult & { ipAddress: string | null; location: string | null; userAgent: string }): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;
    const message = [
      '🔐 Successful login',
      `User: ${data.email} (${data.userType})`,
      `Time: ${new Date().toISOString()}`,
      `IP: ${data.ipAddress ?? 'unknown'}`,
      `Location: ${data.location ?? 'unavailable'}`,
      ...(data.location?.startsWith('GPS: ') ? [`Map: https://maps.google.com/?q=${data.location.slice(5).replace(', ', ',')}`] : []),
      `Device: ${data.userAgent || 'unknown'}`,
    ].join('\n');
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }) });
    } catch (error) {
      this.logger.warn(`Telegram login alert could not be delivered: ${String(error)}`);
    }
  }

  async sendNewDeviceAlert(user: any, ipAddress: string, location: string, userAgent: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || '-1004338421177';
    if (!token || !chatId) return;
    const message = [
      '⚠️ New Device Login Attempt',
      `User: ${user.Email} (admin)`,
      `Time: ${new Date().toISOString()}`,
      `IP: ${ipAddress ?? 'unknown'}`,
      `Location: ${location ?? 'unavailable'}`,
      ...(location?.startsWith('GPS: ') ? [`Map: https://maps.google.com/?q=${location.slice(5).replace(', ', ',')}`] : []),
      `Device: ${userAgent || 'unknown'}`,
      '',
      'Please check the Admin Panel to Confirm or Cancel this request.'
    ].join('\n');
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }) });
    } catch (error) {
      this.logger.warn(`Telegram new device alert could not be delivered: ${String(error)}`);
    }
  }
}
