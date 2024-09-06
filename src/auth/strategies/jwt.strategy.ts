import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";
import { JwtPayload } from "../auth.types";
import { AuthenticationError } from "@nestjs/apollo";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    if (Date.now() >= payload.exp * 1000) {
      throw new AuthenticationError("Token expired");
    }

    const user = await this.usersService.findById(payload.userId);
    if (!user) {
      throw new AuthenticationError(
        "Could not log-in with the provided credentials"
      );
    }

    return user;
  }
}
