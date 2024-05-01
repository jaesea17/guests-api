import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class LocalGuard extends AuthGuard("local") {
  canActivate(context: ExecutionContext) {
    console.log("Ran in local");
    return super.canActivate(context);
  }
}
