import * as request from "supertest";
import setup from "./setup";

describe("AuthResolver (e2e)", () => {
  beforeAll(async () => {
    await setup();
  });

  describe("Registration", () => {
    it("should register a new user", () => {
      return request(global.__APP__.getHttpServer())
        .post("/graphql")
          .send({
          query: `
            mutation {  
              register(registerInput: {
                username: "testuser",
                email: "test@example.com",
                password: "password123"
              }) {
                id
                username
                email
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.register).toHaveProperty("id");
          expect(res.body.data.register.username).toBe("testuser");
          expect(res.body.data.register.email).toBe("test@example.com");
        });
    });

    it("should not register a user with an existing email", async () => {
      await request(global.__APP__.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              register(registerInput: {
                username: "existinguser",
                email: "existing@example.com",
                password: "password123"
              }) {
                id
              }
            }
          `,
        });

      return request(global.__APP__.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              register(registerInput: {
                username: "newuser",
                email: "existing@example.com",
                password: "newpassword123"
              }) {
                id
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe("Email already exists");
        });
    });
  });

  describe("Login", () => {
    it("should login a registered user", async () => {
      // First, register a user
      await request(global.__APP__.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              register(registerInput: {
                username: "loginuser",
                email: "login@example.com",
                password: "password123"
              }) {
                id
              }
            }
          `,
        });

      // Then, try to login
      return request(global.__APP__.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              login(loginInput: {
                email: "login@example.com",
                password: "password123"
              }) {
                access_token
                user {
                  id
                  username
                  email
                }
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.login).toHaveProperty("access_token");
          expect(res.body.data.login.user).toHaveProperty("id");
          expect(res.body.data.login.user.username).toBe("loginuser");
          expect(res.body.data.login.user.email).toBe("login@example.com");
        });
    });

    it("should not login with incorrect credentials", () => {
      return request(global.__APP__.getHttpServer())
        .post("/graphql")
        .send({
          query: `
            mutation {
              login(loginInput: {
                email: "nonexistent@example.com",
                password: "wrongpassword"
              }) {
                access_token
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe("Invalid credentials");
        });
    });
  });
});
