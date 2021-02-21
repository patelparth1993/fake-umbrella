import { Body, Controller, Get, Post, Param, Res, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express'
import { Customer } from 'src/entities/customer.entity';
import { CustomerService } from './customer.service';
import { createCustomerDto } from './dto/create.customer.dto';
import { UpdateCustomerDto } from './dto/update.customer.dto'

@Controller('api/customer')
export class CustomerController {
  constructor(private readonly custService: CustomerService) {}

  // @Get(':name')
  // getCustomer(@Param('name') name: string): string {
  //   return this.custService.getCustomer(name);
  // }

  @Get('all')
  getAllCustomers( @Res() res: Response): void {
     this.custService.getAllCustomers().then(
       data=>{
         res.status(HttpStatus.OK).send({
          status:"SUCCESS",
          data,
          message:"Customers fetched successfully"
        })
       }
     ).catch(
       error=>{
         console.log(error)
         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          status:"ERROR",
          message:"Internal Server Error"
        });
       }
     )
  }  

  @Post('create')
   createCustomer(@Body() customerDto: createCustomerDto, @Res() res: Response): void {
    this.custService.createCustomer(customerDto).then(result=>{
      console.log("Create Customer Response:",result)
      res.status(HttpStatus.CREATED).send({
        status:"SUCCESS",
        data:result,
        message:"Customer Created Successfully"
      })
    }).catch(error=>{
      console.log("Create Customer Error:",error)
      if(error==="Customer already exists"){
        res.status(HttpStatus.BAD_REQUEST).send({
          status:"ERROR",
          message:error
        });
      }else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          status:"ERROR",
          message:"Internal Server Error"
        });
      }
    })
  }

  @Post('delete/:name')
  async deleteCustomer(@Param('name') name,@Res() res: Response): Promise<void> {
     this.custService.deleteCustomer(name)
    .then(result=>{
      res.status(HttpStatus.OK).send({
        status:"SUCCESS",
        message:"Customer Deleted Successfully"
      })
    }).catch(error=>{
      if(error==="Customer not found"){
        res.status(HttpStatus.NOT_FOUND).send({
          status:"OK",
          message:"Customer Not Found"
        });  
      }else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          status:"ERROR",
          message:"Internal Server Error"
        });
      }
    })
  }

  @Post('update/:id')
  async updateCustomer(@Param('id') id, @Body() customer: UpdateCustomerDto,@Res() res: Response): Promise<void> {
     this.custService.updateCustomer(id,customer)
    .then(result=>{
      res.status(HttpStatus.OK).send({
        status:"SUCCESS",
        message:"Customer Updated Successfully"
      })
    }).catch(error=>{
      if(error==="Customer not found"){
        res.status(HttpStatus.NOT_FOUND).send({
          status:"OK",
          message:"Customer Not Found"
        });  
      }else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          status:"ERROR",
          message:"Internal Server Error"
        });
      }
    })
  }
  
  @Get('fivedayforecast')
  async getFiveDayForecast(@Res() res: Response):Promise<void>{
    this.custService.getFiveDayForecast().then(
      data=>{
        res.status(HttpStatus.OK).send({
          status:"SUCCESS",
          message:"Weather forecasted successfully",
          data
        })
      }).catch(
        error=>{
          console.log(error)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            status:"ERROR",
            message:"Internal Server Error"
          });
      })
  }

  @Get('topcustomers')
  async getForecastForTopCustomers(@Res() res: Response):Promise<void>{
    this.custService.getForeCastForTopCustomers().then(
      data=>{
        //console.log(data)
        res.status(HttpStatus.OK).send({
          status:"SUCCESS",
          message:"Weather forecasted successfully",
          data
        })
      }).catch(
        error=>{
          console.log(error)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            status:"ERROR",
            message:"Internal Server Error"
          });
      })
  }
}
