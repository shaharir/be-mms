import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import type { Query as ExpressQuery } from 'express-serve-static-core';
import { Border } from './schemas/border.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';
import { borderCreateDto } from './dto/border.dto';
import { BorderService } from './border.service';
import { Types } from 'mongoose';
interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('border')
export class BorderController {
  constructor(private borderService: BorderService) {}

  @Get()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBorders(
    @Query() query: ExpressQuery,
  ): Promise<{ data: Border[]; pagination: object }> {
    return this.borderService.findAll(query);
  }
  @Get(':id')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard())
  async getBookFindBorderById(
    @Param('id') id: Types.ObjectId,
  ): Promise<Border | null> {
    return this.borderService.findById(id);
  }
  @Post()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard())
  async createBorder(
    @Body() border: borderCreateDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ data: Border; code: number }> {
    return this.borderService.create(border, req.user);
  }

  @Patch(':id')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard())
  async updateBorder(
    @Param('id') id: Types.ObjectId,
    @Body() border: borderCreateDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ data: Border; code: number }> {
    return this.borderService.update(border, req.user, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Border | null> {
    return this.borderService.deleteById(id);
  }
}
