import jwt from "jsonwebtoken";
require("dotenv").config();

const getJWT = (userEmail: string, userId: string, role: string) => {
  let data = {
    exp: Math.floor(Date.now() / 1000) + 60 * 15,
    timeStamp: Date(),
    user: userEmail,
    id: userId,
    userRole: role,
  };

  return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

const checkJWT = async (token: string): Promise<boolean> => {
  const trueToken = token.split(" ")[1];
  const isExp = await getExpFromJWT(token);
  return new Promise<boolean>((resolve, reject) => {
    try {
      jwt.verify(
        trueToken,
        process.env.JWT_SECRET_KEY,
        async (err: any, user: any) => {
          if (err) {
            resolve(false);
          } else {
            if (Date.now() >= isExp) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        }
      );
    } catch (err: any) {
      console.log(err);
      resolve(false);
    }
  });
};

const getUserIdFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.id;
  } catch (err) {
    //console.log(err);
    console.log("error getting user...");
  }
};

const getUserRoleFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.userRole;
  } catch (err) {
    //console.log(err);
    console.log("error getting user...");
  }
};
const getUserEmailFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.user;
  } catch (err) {
    //console.log(err);
    console.log("error getting user...");
  }
};

const getExpFromJWT = async (token: any) => {
  try {
    const myToken: any = jwt.decode(token);
    return myToken.exp;
  } catch (err) {
    //console.log(err);
    console.log("error getting exp...");
  }
};

const userAuth = async (request,response) => {
  const token = request.headers.authorization;
  const role = getUserRoleFromJWT(token);
  const userEmail = getUserEmailFromJWT(token);
  const userId = getUserIdFromJWT(token);
  if (
    request.headers.authorization &&
    (await checkJWT(request.headers.authorization))
  ) {
    response.set(
      "Authorization",
      `Bearer ${getJWT(await userEmail, await userId, await role)}`
    );
    return true;
  } else {
    return false;
  }
};

const adminAuth = async (request,response) => {
  const token = request.headers.authorization;
  const role = getUserRoleFromJWT(token);
  const userEmail = getUserEmailFromJWT(token);
  const userId = getUserIdFromJWT(token);
  if (
    request.headers.authorization &&
    (await checkJWT(request.headers.authorization)) &&
    (await role) === 1
  ) {
    response.set(
      "Authorization",
      `Bearer ${getJWT(await userEmail, await userId, await role)}`
    );
    return true;
  } else {
    return false;
  }
};


export {
  getJWT,
  checkJWT,
  getUserEmailFromJWT,
  getExpFromJWT,
  getUserIdFromJWT,
  getUserRoleFromJWT,
  userAuth,
  adminAuth,
};
