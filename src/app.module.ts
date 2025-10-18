import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BorderModule } from './border/border.module';
import { BazarModule } from './bazar/bazar.module';
import { ReportModule } from './report/report.module';
import { DepositModule } from './deposit/deposit.module';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI!),
    AuthModule,
    BorderModule,
    BazarModule,
    ReportModule,
    DepositModule,
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
