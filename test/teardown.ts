export default async function teardown() {
  const app = global.__APP__;

  if (app) {
    console.log("teardown running");
    await app.close(); // Close the NestJS application instance
  }
}
