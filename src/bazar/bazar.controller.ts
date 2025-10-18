import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BazarService } from './bazar.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Bazar } from './schemas/bazar.schemas';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { Query as ExpressQuery } from 'express-serve-static-core';
import { bazarCreateDto } from './dto/bazar.dto';
import { User } from 'src/auth/schemas/user.schema';
interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('bazar')
export class BazarController {
  constructor(private bazarService: BazarService) {}

  @Get()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBazar(@Query() query: ExpressQuery): Promise<Bazar[]> {
    return this.bazarService.findAll(query);
  }

  @Post()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createBorder(
    @Body() bazar: bazarCreateDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Bazar | null> {
    return this.bazarService.create(bazar, req.user);
  }
}
