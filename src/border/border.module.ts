import { Module } from '@nestjs/common';
import { BorderService } from './border.service';
import { BorderController } from './border.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { borderSchema } from './schemas/border.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'border', schema: borderSchema }]),
  ],
  controllers: [BorderController],
  providers: [BorderService],
  exports: [BorderService],
})
export class BorderModule {}
