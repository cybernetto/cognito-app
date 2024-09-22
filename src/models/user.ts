import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cognitoId: string;

  @Column({nullable:true})
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  isOnboarded: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
