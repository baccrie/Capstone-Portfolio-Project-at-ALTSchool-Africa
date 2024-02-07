const getAllRegions = async (req, res, next) => {
  res.status(200).json({
    message: "get all regions endpoint successful...",
  });
};

module.exports = {
  getAllRegions,
};
