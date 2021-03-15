import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HallSchema } from './schemas/hall.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'hall', schema: HallSchema }])
  ],
  controllers: [HallController],
  providers: [HallService]
})
export class HallModule { }
