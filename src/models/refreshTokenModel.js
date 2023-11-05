import { Sequelize } from "sequelize";

const refreshTokenModel = (sequelize) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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
