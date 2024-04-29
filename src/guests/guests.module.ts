import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";
import { GuestsService } from "./guests.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guests } from "./entities/guests.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Guests])],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class ProductsModule {}
