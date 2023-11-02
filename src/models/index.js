import { Sequelize } from "sequelize";
import jobModel from "./jobModel.js";
import contractModel from "./contractModel.js";
import userModel from "./userModel.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../../database.sqlite3",
  logQueryParameters: true,
  benchmark: true,
});

const Job = jobModel(sequelize);
const Contract = contractModel(sequelize);
const User = userModel(sequelize);

Job.associate({ Contract });
Contract.associate({ User, Job });
User.associate({ Contract });

export { sequelize, User, Contract, Job };
