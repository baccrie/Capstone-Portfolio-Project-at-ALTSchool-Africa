const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'failed',
    msg: 'route not found....',
  });
};

module.exports = { notFound };
