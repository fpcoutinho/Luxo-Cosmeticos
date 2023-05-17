const user_config_get = async (req, res) => {
  res.render("user_config", { css: "config.css" });
};

module.exports = {
  user_config_get,
};
