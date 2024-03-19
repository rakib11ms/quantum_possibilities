const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  // console.log("path",req.path)

  try {
    const user_id = await getUserId(req, res);
    if (user_id) {
      req.userId = user_id;
      next();
    } else {
      throw new Error("Unauthenticated");
    }
    // res.cookie('auth',true)
    // return res.status(200).json({
    //     status: 200,
    //     message: "authenticated"
    // })
  } catch (error) {
    // console.log('error', error)
    return res.status(401).json({
      status: 401,
      message: error.message,
    });
  }
};
const getUserId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token, process.env.SECRET);
    return verify.userId;
  } catch (err) {
    return null;
  }
};
module.exports = {auth, getUserId};
