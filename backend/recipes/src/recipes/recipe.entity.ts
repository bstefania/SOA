import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  preparationTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  imageName: string;

  @Column()
  userId: string;
}
