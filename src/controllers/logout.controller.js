const logout = async (req, res) => {
  try {
    console.log(8, req.query.all);

    req.user.tokens = req.user.tokens.filter((currentElement) => {
      return currentElement.token !== req.token;
    });
    console.log("logout successfully");

    res.clearCookie("jwt");

    await req.user.save();

    res.redirect("/");
  } catch (error) {
    console.error(500, error);
    res.status(500).send(error);
  }
};
module.exports = logout;
