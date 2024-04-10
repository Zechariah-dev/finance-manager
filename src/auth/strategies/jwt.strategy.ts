import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { AuthenticationError } from "@nestjs/apollo";
import { JwtPayload } from "../auth.types";

export class JwtService extends PassportStrategy(Strategy) {
  constructor(private authServic: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET")
    })
  }

  async validate(payload: JwtPayload) {
    const user = null;
    if (!user) {
      throw new AuthenticationError("Could not log-in with the provided credentials")
    }

    return user;
  }
}
