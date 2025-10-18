import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { depositSchema } from './schemas/deposit.schema';
import { borderSchema } from 'src/border/schemas/border.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'deposit', schema: depositSchema },
      { name: 'border', schema: borderSchema },
    ]),
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
