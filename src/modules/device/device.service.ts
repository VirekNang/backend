import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getPendingRequests() {
    return this.prisma.deviceVerificationRequest.findMany({
      where: { Status: 'PENDING' },
      include: {
        Device: true,
        User: { select: { Username: true, Email: true, Phone: true, Image: true } },
      },
      orderBy: { CreatedAt: 'desc' },
    });
  }

  async approveRequest(requestId: number) {
    const request = await this.prisma.deviceVerificationRequest.findUnique({ where: { RequestID: requestId } });
    if (!request) throw new NotFoundException('Request not found');
    
    await this.prisma.deviceVerificationRequest.update({
      where: { RequestID: requestId },
      data: { Status: 'APPROVED' },
    });
    
    await this.prisma.device.update({
      where: { DeviceID: request.DeviceID },
      data: { IsVerified: true },
    });
    
    return { success: true };
  }

  async rejectRequest(requestId: number) {
    const request = await this.prisma.deviceVerificationRequest.findUnique({ where: { RequestID: requestId } });
    if (!request) throw new NotFoundException('Request not found');

    const newRejectionCount = request.RejectionCount + 1;
    
    await this.prisma.deviceVerificationRequest.update({
      where: { RequestID: requestId },
      data: { Status: 'REJECTED', RejectionCount: newRejectionCount },
    });

    if (newRejectionCount >= 3) {
      await this.prisma.device.update({
        where: { DeviceID: request.DeviceID },
        data: { IsBlocked: true },
      });
    }

    return { success: true };
  }

  async getBlockedDevices() {
    return this.prisma.device.findMany({
      where: { IsBlocked: true },
      include: { User: { select: { Username: true, Email: true } } },
    });
  }

  async unblockDevice(deviceId: number) {
    await this.prisma.device.update({
      where: { DeviceID: deviceId },
      data: { IsBlocked: false, IsVerified: false },
    });
    return { success: true };
  }
}
