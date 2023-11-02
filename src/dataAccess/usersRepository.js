import { User } from "../models/index.js";

function findUser(id) {
  return User.findByPk(id);
}

export { findUser };
