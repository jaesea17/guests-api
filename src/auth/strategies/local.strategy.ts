import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  // validate(email: string, password: string) {
  //   const user = this.authService.validateUser({ email, password });
  //   if (!user) throw new UnauthorizedException();
  //   return user;
  // }
  validate(
    request: any,
    email: string = "",
    password: string,
    context: ExecutionContext
  ) {
    console.log({ request });
    const user = this.authService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException();
    // const request = context.switchToHttp().getRequest();
    // request.user = user;
    return user;
  }
}
