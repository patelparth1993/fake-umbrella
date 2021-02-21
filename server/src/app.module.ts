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
      url:"mongodb+srv://fake-umbrella-generic:Test123@fakeumbrella.1infy.mongodb.net/mindbeacon?retryWrites=true&w=majority",
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
