import { BadRequestException, Injectable, NotFoundException, Req,Param } from '@nestjs/common';

import type {FastifyRequest} from 'fastify';
import '@fastify/multipart';
import * as fs from "fs";
import path from 'path/win32';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}
   Get(){
        return this.prisma.categories.findMany();
     }
     GetbyId(id: string) {
       return this.prisma.categories.findUnique({
        where: { uuid: id },
       });
    }
    
    async Create(@Req() request:FastifyRequest){
        let data:any={};
        let filename="";
        
        if (request.isMultipart()) {
            const parts=request.parts();
            if(!fs.existsSync('./uploads')){
                fs.mkdirSync('./uploads');
            }
            for await (const part of parts){
                if(part.type==='field'){
                    data[part.fieldname]=part.value;
                }

                if(part.type==='file'){
                    const ext = part.filename.split('.').pop();
                    filename = Date.now() + '.' + ext;
                    const filepath = path.join(process.cwd(), 'uploads', filename);
                    await fs.promises.writeFile(filepath, await part.toBuffer());
                }
            }
        } else {
            data = request.body || {};
        }

        try{
            const isActive = (data.IsActive === 'true' || data.IsActive === true || data.Status === 'true' || data.Status === true) ? true : false;
            const categories=await this.prisma.categories.create( {
                data:{
                    CategoryName:data.CategoryName,
                    Description:data.Description || data.description || data.Note || '',
                    IsActive:isActive,
                    Thumnail:filename
                }
            });
            return {message:'Category created successfully', data: categories};
        }
        catch(error){
            if(filename){
                const filepath=process.cwd()+`/uploads/${filename}`;
                if(fs.existsSync(filepath)){
                    fs.unlinkSync(filepath);
                }
            }
            throw error;
        }
    }
    
    async Update(id: string,@Req() request:FastifyRequest){
        let data:any={};
        let newFileName:string |null=null;
        
        if (request.isMultipart()) {
            const parts =request.parts();
            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads', { recursive: true });
            }
            for await (const part of parts){
                if(part.type==='field'){
                    data[part.fieldname]=part.value;
                }
                else if (part.type === 'file') {
                    const ext = path.extname(part.filename);
                    newFileName = Date.now() + ext;
                    const filepath = path.join(process.cwd(), 'uploads', newFileName);
                    await fs.promises.writeFile(filepath, await part.toBuffer());
                }   
            }
        } else {
            data = request.body || {};
        }

        const oldCategory = await this.prisma.categories.findUnique({
            where:{uuid: id}
        });
        if (!oldCategory) {
            throw new NotFoundException('Category not found');
        }

        if(newFileName && oldCategory?.Thumnail){
            const oldimage=oldCategory.Thumnail.trim().toLowerCase();
            if(oldimage && oldimage !=='default.png'){
                const oldPath=path.join(process.cwd(),'uploads',oldimage);
                if(fs.existsSync(oldPath)){
                    fs.unlinkSync(oldPath);
                }
            }
        }
        
        const statusValue = (data.IsActive !== undefined) 
            ? (data.IsActive === 'true' || data.IsActive === true ? true : false)
            : (data.Status !== undefined ? (data.Status === 'true' || data.Status === true ? true : false) : oldCategory?.IsActive);
            
        await this.prisma.categories.update({
            where:{uuid: id},
            data:{
                CategoryName:data.CategoryName || oldCategory?.CategoryName,
                Description:data.Description || data.description || data.Note || oldCategory?.Description,
                IsActive:statusValue,
                Thumnail:newFileName || oldCategory?.Thumnail
            }
        });
        return {message:'Category updated successfully'};
    }
      
         async Delete(id: string){
            const Category=await this.prisma.categories.findUnique({
                where:{
                    uuid: id
                }
    
            });
            if(!Category){
                throw new NotFoundException('Category not found');
            }
            const itemCount = await this.prisma.item.count({
                where: { CategoryID: Category.CategoryID },
            });
            if(itemCount > 0){
                throw new BadRequestException('Cannot delete a category with associated products');
            }
            if(Category.Thumnail&&Category.Thumnail.trim().toLowerCase()!=='default.png'){
                const imagePath=path.join(process.cwd(),'uploads',Category.Thumnail);
                if(fs.existsSync(imagePath)){
                    fs.unlinkSync(imagePath);
                }
            }
            await this.prisma.categories.delete({
                where:{
                    uuid: id
                }
            });
            return {message:'Category Deleted Successfully'}
        }
    
     



}
