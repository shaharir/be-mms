import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { borderSchema } from 'src/border/schemas/border.schema';
import { paymentSchema } from './schemas/payment.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'payment', schema: paymentSchema }]),
    MongooseModule.forFeature([{ name: 'border', schema: borderSchema }]),
    AuthModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
