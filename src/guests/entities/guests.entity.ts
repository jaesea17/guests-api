import { Exclude } from "class-transformer";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["name"])
export class Guests {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  isChecked: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertNameToUpperCase() {
    if (this.name) {
      this.name = this.name.toUpperCase().trim();
    }
  }
}
