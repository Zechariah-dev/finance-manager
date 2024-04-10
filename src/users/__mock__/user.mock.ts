import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const userMock = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: "password",
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
});
