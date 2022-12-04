module.exports.userSession = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.json({ error: "Kindly Login to perform this operation" });
  }
};
