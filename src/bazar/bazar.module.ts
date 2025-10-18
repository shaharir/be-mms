import { Module } from '@nestjs/common';
import { BazarController } from './bazar.controller';
import { BazarService } from './bazar.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { bazarSchema } from './schemas/bazar.schemas';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'bazar', schema: bazarSchema }]),
  ],
  controllers: [BazarController],
  providers: [BazarService],
})
export class BazarModule {}
