import repl from "repl";
import * as models from "./src/models/index.js";

Object.keys(models).forEach((modelName) => {
  global[modelName] = models[modelName];
});

const replServer = repl.start({
  prompt: "app > ",
});

replServer.context.db = models;
