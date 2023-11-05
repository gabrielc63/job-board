import { RefreshToken } from "../models/index.js";
import hashToken from "../utils/hashToken.js";

function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
  return RefreshToken.create({
    id: jti,
    hashedToken: hashToken(refreshToken),
    UserId: userId,
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
  return RefreshToken.find({
    where: {
      id,
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
  return RefreshToken.update(
    {
      revoked: true,
    },
    {
      where: {
        id,
      },
    }
  );
}

function revokeTokens(UserId) {
  return RefreshToken.update(
    {
      revoked: true,
    },
    {
      where: {
        UserId,
      },
    }
  );
}

export {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
