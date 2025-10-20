import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllDeposit(): Promise<any> {
    return this.dashboardService.findAll();
  }
}
