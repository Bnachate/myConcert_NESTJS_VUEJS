import { Module } from '@nestjs/common';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from './schemas/concert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }])
  ],
  controllers: [ConcertController],
  providers: [ConcertService]
})
export class ConcertModule { }