const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: payload._id,
      email: payload.email,
    };

    const secret = process.env.JWTPRIVATEKEY;
    const options = {
      expiresIn: "7d",
    };

    jwt.sign(user, secret, options, (error, token) => {
      if (error) {
        reject(error);
      }
      console.log(token);
      resolve(token);
    });
  });
};

module.exports = generateToken;
