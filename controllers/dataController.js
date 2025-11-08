const Crash = require('../models/dataModel');

exports.createCrash = async (req, res) => {
  try {
    const crash = new Crash(req.body);
    await crash.save();
    res.status(201).json(crash);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCrashes = async (req, res) => {
  try {
    const crashes = await Crash.find();
    res.json(crashes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkInsertCrashes = async (req, res) => {
  try {
    const result = await Crash.insertMany(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Bulk insert failed', details: err.message });
  }
};

// PUT /api/crashes/:id - Update a crash record
exports.updateCrash = async (req, res) => {
  try {
    const updatedCrash = await Crash.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedCrash) {
      return res.status(404).json({ error: 'Crash not found' });
    }
    res.json(updatedCrash);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/crashes/:id - Delete a crash record
exports.deleteCrash = async (req, res) => {
  try {
    const deletedCrash = await Crash.findByIdAndDelete(req.params.id);
    if (!deletedCrash) {
      return res.status(404).json({ error: 'Crash not found' });
    }
    res.json({ message: 'Crash deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};