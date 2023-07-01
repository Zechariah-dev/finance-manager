import { join } from "path";
import { Config } from "./config.interface";

const config: Config = {
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: "./src/schema.graphql",
    sortSchema: true,
  },
};

export default (): Config => config;
