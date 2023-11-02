import { DataTypes, Sequelize } from "sequelize";

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
const jobModel = (sequelize) => {
  const Job = sequelize.define(
    "Job",
    {
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
      },
    },
    {}
  );

  Job.associate = function(models) {
    Job.belongsTo(models.Contract);
  };

  return Job;
};

export default jobModel;
