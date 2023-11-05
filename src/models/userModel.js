import { Sequelize } from "sequelize";

const userModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM("client", "contractor"),
      },
    },
    {}
  );

  User.associate = function(models) {
    User.hasMany(models.RefreshToken, { onDelete: "cascade", hooks: true });
    User.hasMany(models.Contract, { as: "Client", foreignKey: "ClientId" });
    User.hasMany(models.Contract, {
      as: "Contractor",
      foreignKey: "ContractorId",
    });
  };

  return User;
};

export default userModel;
