import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RegisterInput } from "./models/register-input.model";
import { Bcrypt } from "../common/utils/bcrypt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private bcrypt: Bcrypt
  ) {}

  public async userRegister(registerInput: RegisterInput) {
    const hashedPassword = await this.bcrypt.hashPassword(
      registerInput.password
    );

    const user = await this.usersService.create({
      ...registerInput,
      password: hashedPassword,
    });

    return user;
  }

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

  verifyToken(token: string, secret?: string) {
    return this.jwtService.verify(token, {
      ignoreExpiration: true,
      secret: secret ?? this.configService.get("JWT_SECRET"),
    });
  }
}
