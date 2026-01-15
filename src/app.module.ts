import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyingModule } from './buying/buying.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './buying/entities/buying.entity';

@Module({
  imports: [
    BuyingModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myuser',
      password: 'mypass',
      database: 'mydb',
      models: [Item],
      synchronize: true,})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
