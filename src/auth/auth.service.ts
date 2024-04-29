import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './roles_permissions/dto/login.dto';
import { UsersService } from 'src/users/users.service';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // private jwtService: JwtService,
  ) {}
  async validateUser(loginUserDto: LoginUserDto) {
    const { email, password: incomingPassword } = loginUserDto;
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new NotFoundException();
    const { password, ...userEd } = user;
    const validPassword = password === incomingPassword;
    if (!validPassword)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    return userEd;
  }
  // isValidPassword() {}
}
