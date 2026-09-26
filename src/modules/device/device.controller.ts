import { Body, Controller, ForbiddenException, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/devices')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  private ensureAdministrator(request: any) {
    const hasAdminPerms = request.user?.IsAdmin;
      
    if (!hasAdminPerms) {
      throw new ForbiddenException('Only administrators can manage device approvals');
    }
  }

  @Get('pending')
  getPendingRequests(@Req() request: any) {
    this.ensureAdministrator(request);
    return this.deviceService.getPendingRequests();
  }

  @Post('approve')
  approveRequest(@Body() body: { requestId: number }, @Req() request: any) {
    this.ensureAdministrator(request);
    return this.deviceService.approveRequest(body.requestId);
  }

  @Post('reject')
  rejectRequest(@Body() body: { requestId: number }, @Req() request: any) {
    this.ensureAdministrator(request);
    return this.deviceService.rejectRequest(body.requestId);
  }

  @Get('blocked')
  getBlockedDevices(@Req() request: any) {
    this.ensureAdministrator(request);
    return this.deviceService.getBlockedDevices();
  }

  @Post('unblock')
  unblockDevice(@Body() body: { deviceId: number }, @Req() request: any) {
    this.ensureAdministrator(request);
    return this.deviceService.unblockDevice(body.deviceId);
  }
}
