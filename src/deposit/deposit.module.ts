import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { depositSchema } from './schemas/deposit.schema';
import { borderSchema } from 'src/border/schemas/border.schema';
import { BorderModule } from 'src/border/border.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'deposit', schema: depositSchema },
      { name: 'border', schema: borderSchema },
    ]),
    AuthModule,
    BorderModule,
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
