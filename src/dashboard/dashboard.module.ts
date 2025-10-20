import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mealSchema } from 'src/meal/schemas/meal.schema';
import { borderSchema } from 'src/border/schemas/border.schema';
import { AuthModule } from 'src/auth/auth.module';
import { depositSchema } from 'src/deposit/schemas/deposit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'meal', schema: mealSchema },
      { name: 'border', schema: borderSchema },
      { name: 'deposit', schema: depositSchema },
    ]),
    AuthModule,
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
