import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { GuestsService } from "./guests.service";
import { CreateGuestDto } from "./dto/createGuests.dto";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/auth/roles_permissions/decorators/public.decorator";

@ApiTags("Guests")
@Controller("guests")
export class GuestsController {
  constructor(private guestService: GuestsService) {}

  @Public()
  @Post()
  async createGuest(@Body() guestsDto: CreateGuestDto[]) {
    try {
      return await this.guestService.createGuests(guestsDto);
    } catch (error) {}
  }

  // @Roles(RolesEnum.Admin)
  // @UseGuards(RolesGuard)
  @Public()
  @Get()
  async getGuests(
    @Query() query: { page: number; pageSize: number; search: string }
  ) {
    try {
      const { page, pageSize, search } = query;
      return await this.guestService.getGuests(page, pageSize, search);
    } catch (error) {}
  }

  @Get(":id")
  async getGuest(@Param("id") id: string) {
    try {
      return this.guestService.getGuest(id);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Patch(":id")
  async updateGuest(
    @Param("id") id: string,
    @Body() updatedGuest: Partial<CreateGuestDto>
  ) {
    try {
      return await this.guestService.updateGuest(id, updatedGuest);
    } catch (error) {}
  }

  @Public()
  @Delete(":id")
  async deleteGuest(@Param("id") id: string) {
    try {
      const res = await this.guestService.deleteGuest(id);
    } catch (error) {}
  }

  @Delete()
  async deleteGuests() {
    try {
      console.log("ran in the delete");
      // const res = await this.guestService.deleteGuests();
    } catch (error) {}
  }
}
