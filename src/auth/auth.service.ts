import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async generateAuthToken(payload: {
    email: string;
    userId: string;
    remember_me: boolean;
  }) {
    const access_token = this.jwtService.sign(
      { email: payload.email, userId: payload.userId },
      { secret: this.configService.get("JWT_SECRET") }
    );
    const tokens = { access_token };

    if (payload.remember_me) {
      const refresh_token = this.jwtService.sign(
        { email: payload.email, userId: payload.userId },
        { secret: this.configService.get("JWT_REFRESH_SECRET") }
      );
      Object.assign(tokens, { refresh_token });
    }

    return tokens;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  verifyToken(token: string, secret?: string) {
    return this.jwtService.verify(token, {
      ignoreExpiration: true,
      secret: secret ?? this.configService.get("JWT_SECRET")
    })
  }
}
