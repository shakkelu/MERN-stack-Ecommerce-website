import JWT from "jsonwebtoken";

export const loggedin = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
  }
};
