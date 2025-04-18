import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({id:userId}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //in MS
    httpOnly: true, // prevents XSS and cross-site scripting attacks
    sameSite: "strict", // prevents CSRF attacks (Cross Site Resource Forgery)
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
