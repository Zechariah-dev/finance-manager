import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((val) => {
              switch (val) {
                case "JWT_SECRET":
                  return "jwtsecret";
                case "JWT_REFRESH_SECRET":
                  return "jwtrefreshsecret";
                default:
                  return "default";
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should hash password correctly", async () => {
    const password = "password";
    const hashedPassword = await service.hashPassword(password);

    const isPasswordMatch = await service.comparePassword(
      password,
      hashedPassword
    );

    expect(isPasswordMatch).toBeTruthy();
  });
});
