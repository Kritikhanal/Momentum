export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  

  // Log the JWT_SECRET_KEY to make sure it's correctly loaded
  console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY); 
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
