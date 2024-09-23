import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./models/login-input.model";
import { LoginResponse } from "./models/login-response.model";
import { RegisterInput } from "./models/register-input.model";
import { ForgotPassword } from "./models/reset-password.model";
import { MessageResponse } from "../common/types";
import { ApolloError, UserInputError } from "apollo-server-express";
import { ResetPasswordInput } from "./models/reset-password-input";
import { UsersService } from "../users/users.service";
import { Bcrypt } from "../common/utils/bcrypt";
import { User } from "../users/entities/user.entity";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private bcrypt: Bcrypt
  ) {}

  @Mutation(() => User)
  async register(@Args("registerInput") registerInput: RegisterInput) {
    const existingUser = await this.usersService.findByEmail(
      registerInput.email
    );
    if (existingUser) {
      throw new UserInputError("Email already in use");
    }

    return await this.authService.userRegister(registerInput);
  }

  @Mutation(() => LoginResponse)
  async login(@Args("loginInput") loginInput: LoginInput) {
    const user = await this.usersService.findByEmail(loginInput.email);

    if (!user) {
      throw new ApolloError("Incorrect email or password", "400");
    }

    const isMatch = await this.bcrypt.comparePassword(
      loginInput.password,
      user.password
    );
    if (!isMatch) {
      throw new ApolloError("incorrect email or password", "400");
    }

    const tokens = await this.authService.generateAuthToken({
      email: user.email,
      userId: user.id,
      remember_me: loginInput.remember_me,
    });

    return { user, tokens };
  }

  @Query(() => MessageResponse)
  async forgotPassword(
    @Args("forgotPassword") forgotPasswordArgs: ForgotPassword
  ) {
    const userExist = await this.usersService.findByEmail(
      forgotPasswordArgs.email
    );
    if (!userExist) {
      throw new ApolloError("user account not found", "400");
    }

    // TODO: work on email service

    // const token = this.jwtService.sign(
    //   { email: forgotPasswordInput.email },
    //   { expiresIn: "20m" }
    // );

    return { message: "reset password email sent successfully" };
  }

  @Query(() => MessageResponse)
  async resetPassword(
    @Args("resetPasswordInput") resetPasswordInput: ResetPasswordInput
  ) {
    const payload = this.authService.verifyToken(resetPasswordInput.token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp > currentTimestamp) {
      throw new ApolloError("reset token expired", "400");
    }

    const hashedPassword = await this.bcrypt.hashPassword(
      resetPasswordInput.password
    );

    const user = await this.usersService.update({
      where: { email: payload.email },
      data: { password: hashedPassword },
    });

    if (!user) {
      throw new ApolloError("Invalid token", "400");
    }

    return { message: "password reset mail successfully" };
  }
}
