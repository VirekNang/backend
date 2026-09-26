import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateMembershipDto, UpdateMembershipDto } from './dto/membership.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MembershipService {
    constructor(private readonly prismaService: PrismaService) { }
    GetAll() {
        return this.prismaService.membership.findMany();
    }
    GetById(id: string) {
        return this.prismaService.membership.findUnique({
            where: {
                uuid: id,
            },
        });
    }
    Create(membership: CreateMembershipDto) {
        return this.prismaService.membership.create({
            data: membership as Prisma.MembershipUncheckedCreateInput,
        });
    }
    async Update(id: string, membership: UpdateMembershipDto) {
        const existing = await this.prismaService.membership.findUnique({
            where: { uuid: id },
        });
        if (!existing) {
            throw new NotFoundException('Membership not found');
        }
        return this.prismaService.membership.update({
            where: {
                uuid: id,
            },
            data: membership as Prisma.MembershipUncheckedUpdateInput,
        });
    }
    async Delete(id: string) {
        const existing = await this.prismaService.membership.findUnique({
            where: { uuid: id },
        });
        if (!existing) {
            throw new NotFoundException('Membership not found');
        }
        const customerCount = await this.prismaService.customer.count({
            where: { MembershipID: existing.MembershipID }
        });
        if (customerCount > 0) {
            throw new BadRequestException('Cannot delete membership tier that is assigned to customers');
        }
        return this.prismaService.membership.delete({
            where: {
                uuid: id,
            },
        });
    }

}
