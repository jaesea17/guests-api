import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, getRepository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/user.dto';
import { RolesEntity } from 'src/auth/roles_permissions/entities/roles.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async createUser(user: CreateUserDto): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async getUsers(): Promise<Users[]> {
    const usersWithPermissions = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rolesEntity', 'rolesEntity')
      .select([
        'user',
        'rolesEntity', // Include the permissions column from RolesEntity
      ])
      .getMany();

    return usersWithPermissions;
    // return await this.usersRepository.find();
  }

  async getUser(userId: string): Promise<Users> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async updateUser(
    userId: string,
    updatedUser: Partial<Users>,
  ): Promise<UpdateResult> {
    try {
      const result = await this.usersRepository.update(userId, updatedUser);
      // Check if the user was found and updated successfully
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const result = await this.usersRepository.delete(userId);

      // Check if the product was found and deleted successfully
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    } catch (error) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async deleteUsers(): Promise<void> {
    await this.usersRepository.delete({});
  }

  async getUserByEmail(userEmail: string): Promise<Users> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          email: userEmail,
        },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${userEmail} not found`);
    }
  }
  @OnEvent('product.created')
  listenTwo(payload: any) {
    console.log('in ListenTowww', payload);
  }
}
