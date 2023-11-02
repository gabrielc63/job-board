import { Sequelize } from "sequelize";

const contractModel = (sequelize) => {
  const Contract = sequelize.define(
    "Contract",
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("new", "in_progress", "terminated"),
      },
    },
    {}
  );

  Contract.associate = function(models) {
    Contract.belongsTo(models.User, { as: "Client" });
    Contract.belongsTo(models.User, { as: "Contractor" });
    Contract.hasMany(models.Job);
  };

  return Contract;
};

export default contractModel;
