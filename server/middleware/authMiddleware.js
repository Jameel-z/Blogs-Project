import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check json web token exists & verified
  if (token) {
    jwt.verify(token, "my own secret to hash", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        throw Error("missing token");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.end();
  }
};

//check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, "my own secret to hash", async (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.locals.user = null;
//         next();
//       } else {
//         console.log(decodedToken);
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

export {
  requireAuth,
  //checkUser
};
