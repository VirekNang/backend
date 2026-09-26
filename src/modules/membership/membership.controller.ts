import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto, UpdateMembershipDto } from './dto/membership.dto';

@Controller('membership')
export class MembershipController {
    constructor(private readonly membershipService: MembershipService) { }
    @Get('')
    GetAll(){
        return this.membershipService.GetAll();
    }
    @Get(':id')
    GetById(@Param('id') id: string){
        return this.membershipService.GetById(id);
    }
    @Post('')
    Create(@Body() membership: CreateMembershipDto){
        return this.membershipService.Create(membership);
    }
    @Put(':id')
    Update(@Param('id') id: string, @Body() membership: UpdateMembershipDto){
        return this.membershipService.Update(id,membership);
    }
    @Delete(':id')
    Delete(@Param('id') id: string){
        return this.membershipService.Delete(id);
    }

}
