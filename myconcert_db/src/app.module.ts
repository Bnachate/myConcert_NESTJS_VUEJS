import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HallModule } from './hall/hall.module';
import { ConcertModule } from './concert/concert.module';
import { BandModule } from './band/band.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://brahim:@test.ifjqe.mongodb.net/myconcertdb?retryWrites=true&w=majority', { useNewUrlParser: true }),
    UserModule,
    HallModule,
    ConcertModule,
    BandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
