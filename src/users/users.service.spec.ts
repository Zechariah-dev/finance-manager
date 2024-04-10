import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "nestjs-prisma";
import { userCreateInput, userMock } from "./__mock__/user.mock";
import { faker } from "@faker-js/faker";

describe("UsersService", () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            account: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it("should create uaer", async () => {
    const input = userCreateInput();
    const user = userMock();

    jest.spyOn(prisma, "$transaction").mockResolvedValue(user);

    const result = await service.create(input);

    expect(result).toStrictEqual(user);
  });

  it("should user by email", async () => {
    const user = userMock();

    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(user);

    const result = await service.findByEmail(user.email);

    expect(result).toStrictEqual(result);
    expect(prisma.user.findUnique).toHaveBeenCalled();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: user.email },
    });
  });

  it("should update user", async () => {
    const firstname = faker.person.firstName();
    const user = userMock();

    const updateUser = { ...user, firstname };

    jest.spyOn(prisma.user, "update").mockResolvedValue(updateUser);

    const result = await service.update({
      where: { email: user.email },
      data: { firstname },
    });

    expect(result).toStrictEqual(updateUser);
    expect(prisma.user.update).toHaveBeenCalled();
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email: user.email },
      data: { firstname },
    });
  });
});
