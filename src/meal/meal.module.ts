import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mealSchema } from './schemas/meal.schema';
import { borderSchema } from 'src/border/schemas/border.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'meal', schema: mealSchema },
      { name: 'border', schema: borderSchema },
    ]),
  ],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule {}
