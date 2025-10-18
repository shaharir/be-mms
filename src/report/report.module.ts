import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { bazarSchema } from 'src/bazar/schemas/bazar.schemas';
import { depositSchema } from 'src/deposit/schemas/deposit.schema';
import { borderSchema } from 'src/border/schemas/border.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'bazar', schema: bazarSchema }]),
    MongooseModule.forFeature([{ name: 'deposit', schema: depositSchema }]),
    MongooseModule.forFeature([{ name: 'border', schema: borderSchema }]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
