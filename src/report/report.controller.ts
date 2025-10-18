import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { Query as ExpressQuery } from 'express-serve-static-core';
import { Bazar } from 'src/bazar/schemas/bazar.schemas';
import { Deposit } from 'src/deposit/schemas/deposit.schema';
import { Border } from 'src/border/schemas/border.schema';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('/bazar')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBazar(
    @Query() query: ExpressQuery,
  ): Promise<{ totalBazar: number; data: Bazar[] }> {
    return this.reportService.findAllBazar(query);
  }

  @Get('/deposit')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllDeposit(
    @Query() query: ExpressQuery,
  ): Promise<{ totalDeposit: number; data: Deposit[] }> {
    return this.reportService.findAllDeposit(query);
  }

  @Get('/border')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBorder(
    @Query() query: ExpressQuery,
  ): Promise<{ totalMeal: number; data: Border[] }> {
    return this.reportService.findAllBorder(query);
  }
}
