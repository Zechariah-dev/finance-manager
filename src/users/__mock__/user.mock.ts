import { Prisma, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const userMock = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: "password",
  account_verify_expires: null,
  account_verify_token: null,
  email_verified_at: null,
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
});

export const userCreateInput = (): Prisma.UserCreateInput => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
});
