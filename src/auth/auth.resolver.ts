import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./models/login-input.model";
import { LoginResponse } from "./models/login-response.model";
import { RegisterInput } from "./models/register-input.model";
import { User } from "../common/types/user.model";
import { ForgotPassword } from "./models/reset-password.model";
import { MessageResponse } from "../common/types";
import { ApolloError } from "apollo-server-express";
import { ResetPasswordInput } from "./models/reset-password-input";
import { UsersService } from "../users/users.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Mutation(() => User)
  async register(@Args("registerInput") registerInput: RegisterInput) {
    const userExist = await this.usersService.findByEmail(registerInput.email);
    if (userExist) {
      throw new ApolloError("Could not register with this credentials", "400");
    }

    const hashedPassword = await this.authService.hashPassword(
      registerInput.password
    );

    const user = await this.usersService.create({
      ...registerInput,
      password: hashedPassword,
    });

    return user;
  }

  @Mutation(() => LoginResponse)
  async login(@Args("loginInput") loginInput: LoginInput) {
    const userExist = await this.usersService.findByEmail(loginInput.password);

    if (!userExist) {
      throw new ApolloError("Incorrect email or password", "400");
    }

    const isMatch = await this.authService.comparePassword(
      loginInput.password,
      userExist.password
    );
    if (!isMatch) {
      throw new ApolloError("incorrect email or password", "400");
    }

    const tokens = await this.authService.generateAuthToken({
      email: userExist.email,
      userId: userExist.id,
      remember_me: loginInput.remember_me,
    });

    return { user: userExist, tokens };
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
    const payload = this.authService.verifyToken(resetPasswordInput.token) 
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp > currentTimestamp) {
      throw new ApolloError("reset token expired", "400");
    }

    const hashedPassword = await this.authService.hashPassword(
      resetPasswordInput.password
    );

    const user = await this.usersService.update({
      where: { email: payload.email },
      data: { password: hashedPassword },
    });

    if (!user) {
      throw new ApolloError("invalid token", "400");
    }

    return { message: "password reset successfully" };
  }
}
