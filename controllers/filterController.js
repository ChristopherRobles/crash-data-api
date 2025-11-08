const Crash = require('../models/dataModel');

exports.filterCrashes = async (req, res) => {
  try {
    const query = {};

    // Basic filters
    if (req.query.ward) query['properties.WARD'] = req.query.ward;
    if (req.query.fatal_driver) query['properties.FATAL_DRIVER'] = Number(req.query.fatal_driver);

    // Date range filter
    if (req.query.from || req.query.to) {
      query['properties.REPORTDATE'] = {};
      if (req.query.from) query['properties.REPORTDATE'].$gte = new Date(req.query.from);
      if (req.query.to) query['properties.REPORTDATE'].$lte = new Date(req.query.to);
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const crashes = await Crash.find(query).skip(skip).limit(limit);
    res.json(crashes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};