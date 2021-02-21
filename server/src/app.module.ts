import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { CustomerController } from './customer/customer.controller'
import { AppService } from './app.service';
import { CustomerService } from "./customer/customer.service"
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customer.entity'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mongodb",
      url:process.env.db_string,
      entities:[Customer],
      synchronize:true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      useNewUrlParser:true
    }),
    TypeOrmModule.forFeature([Customer]),
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController,CustomerController],
  providers: [AppService,CustomerService],
})
export class AppModule {}
