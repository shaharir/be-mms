import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { Deposit } from './schemas/deposit.schema';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { Query as ExpressQuery } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';
import { depositCreateDto } from './dto/deposit.dto';
interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService) {}

  @Get()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllDeposit(@Query() query: ExpressQuery): Promise<Deposit[]> {
    return this.depositService.findAll(query);
  }

  @Post()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createDeposit(
    @Body() deposit: depositCreateDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Deposit | null> {
    return this.depositService.create(deposit, req.user);
  }
}
