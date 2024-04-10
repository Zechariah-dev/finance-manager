import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: "2h",
      },
    }),
  ],
  providers: [AuthResolver, AuthService, UsersService],
})
export class AuthModule {}
