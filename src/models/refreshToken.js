import { Sequelize } from "sequelize";

const refreshTokenModel = (sequelize) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      hashedToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      revoked: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    {}
  );

  RefreshToken.associate = function(models) {
    RefreshToken.belongsTo(models.User);
  };

  return RefreshToken;
};

export default refreshTokenModel;
