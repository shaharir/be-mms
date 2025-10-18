import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Meal } from './schemas/meal.schema';
import type { Query as ExpressQuery } from 'express-serve-static-core';
import { mealCreateDto } from './dto/meal.dto';
import { User } from 'src/auth/schemas/user.schema';
interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBorders(@Query() query: ExpressQuery): Promise<Meal[]> {
    return this.mealService.findAll(query);
  }

  @Post()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createMeal(
    @Body() meal: mealCreateDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Meal | null> {
    return this.mealService.create(meal, req.user);
  }
}
