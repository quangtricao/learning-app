const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");

  const getTokenFrom = () => {
    authorization.toLowerCase().startsWith("bearer ");
    return authorization.substring(7);
  };

  if (authorization) {
    // isolates/detaches the token from the authorization header
    const token = getTokenFrom();

    // The validity of the token is checked with jwt.verify
    // The method jwt.verify also decodes the token, or returns the Object which the token was based on.
    // The object decoded from the token, decodedToken, contains 'username' and 'id' fields which tells the server who made the request.
    // If there is no token passed, it will return an error "jwt must be provided".
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken) {
      request.user = await User.findById(decodedToken.id);
    } else {
      return response
        .status(401)
        .json({ error: "token missing or invalid" });
    }
  }

  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  userExtractor,
};
