const notFound = (req, res, next) => {
  res.status(404).json({
    msg: 'route not found....',
  });
};

module.exports = { notFound };
