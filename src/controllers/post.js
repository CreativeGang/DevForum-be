const post = async (req, res) => {
  const { user } = req.user;
  res.send(`user_id:${user.id} autehticate successfully`);
};

module.exports = post;
