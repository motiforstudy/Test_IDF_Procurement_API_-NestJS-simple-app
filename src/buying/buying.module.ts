import { Module } from '@nestjs/common';
import { BuyingService } from './buying.service';
import { BuyingController } from './buying.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './entities/buying.entity';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [BuyingController],
  providers: [BuyingService],
})
export class BuyingModule {}