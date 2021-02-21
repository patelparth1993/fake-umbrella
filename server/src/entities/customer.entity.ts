import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ObjectIdColumn, Unique, Index } from 'typeorm';

@Entity('customers')
export class Customer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({unique:true})
  name: string;

  @Column()
  personOfContact: string;

  @Column()
  telephoneNumber: number;

  @Column()
  location: string;

  @Column()
  numberOfEmployees: number;

  constructor(customer?: Partial<Customer>) {
    Object.assign(this, customer);
  }
}