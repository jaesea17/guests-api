import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { Public } from 'src/auth/roles_permissions/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {}
  }

  @Public()
  @Get()
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {}
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      return this.userService.getUser(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUser: Partial<CreateUserDto>,
  ) {
    try {
      return await this.userService.updateUser(id, updatedUser);
    } catch (error) {}
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      this.userService.deleteUser(id);
    } catch (error) {}
  }

  @Delete()
  async deleteUsers() {
    try {
      this.userService.deleteUsers();
    } catch (error) {}
  }
}
