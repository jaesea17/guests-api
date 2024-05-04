import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository, UpdateResult } from "typeorm";
import { CreateGuestDto } from "./dto/createGuests.dto";
import { Guests } from "./entities/guests.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guests)
    private guestsRepository: Repository<Guests>,
    private eventEmitter: EventEmitter2
  ) {}
  async createGuests(guests: CreateGuestDto[]): Promise<Guests[]> {
    const newGuests: Guests[] = [];
    for (const guest of guests) {
      const newGuest = this.guestsRepository.create(guest);
      newGuests.push(newGuest);
    }
    return await this.guestsRepository.save(newGuests);
  }

  async getGuests(
    page: number = 1,
    pageSize: number = 20,
    searchQuery?: string
  ): Promise<{ guests: Guests[]; total: number }> {
    const offset = (page - 1) * pageSize;
    let whereCondition: any = {};
    let guests: any, total: number;
    if (searchQuery) {
      whereCondition = { name: Like(`%${searchQuery.toUpperCase().trim()}%`) };
      [guests, total] = await this.guestsRepository.findAndCount({
        where: whereCondition,
        skip: offset,
        take: pageSize,
        order: {
          name: "ASC", // or 'DESC' for descending order
        },
      });
    } else {
      [guests, total] = await this.guestsRepository.findAndCount({
        skip: offset,
        take: pageSize,
        order: {
          name: "ASC", // or 'DESC' for descending order
        },
      });
    }
    return { guests, total };
  }

  async getGuest(guestId: string): Promise<Guests> {
    try {
      return await this.guestsRepository.findOneOrFail({
        where: {
          id: guestId,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${guestId} not found`);
    }
  }

  async updateGuest(
    guestId: string,
    updatedGuest: Partial<CreateGuestDto>
  ): Promise<UpdateResult> {
    try {
      const payload = updatedGuest["payload"];
      const result = await this.guestsRepository.update(guestId, {
        isChecked: payload,
      });
      // Check if the product was found and updated successfully
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${guestId} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteGuest(guestId: string): Promise<void> {
    try {
      const result = await this.guestsRepository.delete(guestId);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${guestId} not found`);
      }
    } catch (error) {
      throw new NotFoundException(`User with ID ${guestId} not found`);
    }
  }

  async deleteGuests(): Promise<void> {
    await this.guestsRepository.delete({});
    // await this.guestsRepository.query("DROP TABLE guests;");
  }
}
