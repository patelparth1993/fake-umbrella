import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from "rxjs/operators"
import axios from "axios"
import { ObjectID } from "mongodb"
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private CustomersRepository: Repository<Customer>,
    private httpService: HttpService
  ) {}

  async getCustomer(name): Promise<any> {
    return await this.CustomersRepository.findOne({name})
  }

  getAllCustomers(): Promise<any> {
    return this.CustomersRepository.find()
  }

  async createCustomer(customer): Promise<any> {
    let checkCustomerExists= await this.getCustomer(customer.name) 
    if(!checkCustomerExists){
      return this.CustomersRepository.save(customer)
    }else{
      return new Promise((resolve,reject)=>{
        reject("Customer already exists")
      })
    }
  }

  async updateCustomer(id,customer): Promise<any>{
    //check if exists
    return new Promise(async (resolve,reject)=>{
      const exists = ObjectID.isValid(id) && await this.CustomersRepository.findOne(id);
      if(!exists){
        reject("Customer not found")
      }
      try{
        let updateResult= await this.CustomersRepository.update(id,customer);
        resolve(updateResult)
      }catch(error){
        reject(error)
      }

    })
  }

  deleteCustomer(name): Promise<any>{
  
    return new Promise(async (resolve,reject)=>{
      const exists = name!=="" && name!=="undefined" && await this.getCustomer(name);
      if(!exists){
        reject("Customer not found")
      }
      try{
        let deleteResult= await this.CustomersRepository.delete({name});
        resolve(deleteResult)
      }catch(error){
        reject(error)
      }

    })
  }

  async getFiveDayForecast(): Promise<any>{
    //Get distinct list of location of all customers
    return new Promise( async (resolve, reject)=>{
      try{

        let listOfCities:Set<string>= new Set();
        let resultForecast=[];
        (await this.CustomersRepository.find()).forEach(customer=>{
            listOfCities.add(customer.location)
        })

        for(let city of listOfCities){
          resultForecast.push(await this.getWeatherForecastForCity(city))
        }
       resolve(resultForecast)
      }catch(error){
        console.log(error)
        reject("Something Went Wrong")
      }

    })
  }

  async getForeCastForTopCustomers(): Promise<any>{
    return new Promise(async (resolve,reject)=>{
      try{
        let noOfEmployeesSet = new Set();
        (await this.CustomersRepository.find()).forEach(customer=>{
          noOfEmployeesSet.add(customer.numberOfEmployees)
        })
    
        let noOfEmployeesArr= [...noOfEmployeesSet].sort((a:any,b:any)=>{
          return b-a;
        })
        noOfEmployeesArr=noOfEmployeesArr.slice(0,4)
        let topFourCustomers=[]
        noOfEmployeesArr.forEach(async (filter:any)=>{
          let customers = await this.CustomersRepository.find({numberOfEmployees:filter})
          customers.forEach(customer=>{
            topFourCustomers.push(customer)
          })
        })
        setTimeout(async ()=>{
          let topFourCustomersForecast=[]
          let firstForecast=true;
          let forecasted=false;
          for(let customer of topFourCustomers){
            forecasted=false;``
            if(firstForecast){
              //get forecast
              topFourCustomersForecast.push({
                name:customer.name,
                numberOfEmployees:customer.numberOfEmployees,
                ...await this.getWeatherForecastForCity(customer.location,true)
              })
              firstForecast=false;
            }else{
              for(let eachCustForecast of topFourCustomersForecast){
                if(eachCustForecast.city===customer.location){
                  //forecast already available
                  console.log("forecast already available")
                  topFourCustomersForecast.push({
                    name:customer.name,
                    numberOfEmployees:customer.numberOfEmployees,
                    city:customer.location,
                    rainForecast:eachCustForecast.rainForecast
                  })
                  forecasted=true;
                  break;
                }
              }
      
              if(!forecasted){
                //get forecast
                topFourCustomersForecast.push({
                  name:customer.name,
                  numberOfEmployees:customer.numberOfEmployees,
                  ...await this.getWeatherForecastForCity(customer.location,true)
                })
              }
            }
          }

         resolve(topFourCustomersForecast)
        },500)
      }catch(error){
        console.log(error)
        reject("Something went wrong")
      }
    })
  }

  getWeatherForecastForCity(city,topFour=false):Promise<any>{
    return new Promise((resolve,reject)=>{
      let eachCityForecast=[]
      let eachCityForecastBoolean=false;
       this.httpService.get(process.env.owm_api_url,{params:{q:city,appid:process.env.owm_api_key}}).subscribe(data=>{
        // console.log(data.data)
       if(data.data.cod==='200'){
         for(let threeHourForecast of data.data.list){
          //assuming owm always returns weather array with 1 element
          if(!topFour){
            //push all weather data for API call fivedayforecast
            if(threeHourForecast.weather[0].main.toLowerCase().includes('rain')){
              eachCityForecast.push(threeHourForecast.dt_txt)
            }
          }else{
            //push only if rain is predicted in next five days for API call topfourcustomers
            if(threeHourForecast.weather[0].main.toLowerCase().includes('rain')){
              eachCityForecastBoolean=true;
              break;
            }
          }
         }
         if(!topFour){
           resolve({
             city,
             rainTime:eachCityForecast
           })
         }else{
           resolve({
             city,
             rainForecast:eachCityForecastBoolean
           })
         }

       } else{
         console.log("No response")
          let pushResult={
            city,
            forecasst:[]
          }
         resolve(pushResult)
       }
     })
    })
  }
}
