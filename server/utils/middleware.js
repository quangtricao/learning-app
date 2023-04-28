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

// Find and return User from "users" collection in MongoDB
const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");

  const getTokenFrom = () => {
    authorization.toLowerCase().startsWith("bearer ");
    return authorization.substring(7);
  };

  if (authorization) {
    // isolates/detaches the token from the authorization header
    const token = getTokenFrom();

    // jwt.verify checks the validity of a token, or decodes a token
    // The method returns the object which the token was based on
    // The object tells the server who made the request
    // The object contains 'username' and 'id' fields as follows:
    // {
    //   username: ...
    //   id: ...
    // }
    // If there is no token passed, it will return an error "jwt must be provided".
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken) {
      request.user = await User.findById(decodedToken.id);
    } else {
      return response.status(401).json({ error: "token missing or invalid" });
    }
  }

  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  userExtractor,
};
