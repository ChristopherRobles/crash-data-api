const Crash = require('../models/dataModel');

exports.q1 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties.REPORTDATE');
    const periods = {
      Night: 0,      // 0–5
      Morning: 0,    // 6–11
      Afternoon: 0,  // 12–17
      Evening: 0     // 18–23
    };

    crashes.forEach(c => {
      const hour = new Date(c.properties.REPORTDATE).getHours();
      if (hour >= 6 && hour <= 11) periods.Morning++;
      else if (hour >= 12 && hour <= 17) periods.Afternoon++;
      else if (hour >= 18 && hour <= 23) periods.Evening++;
      else periods.Night++;
    });

    const peakPeriod = Object.entries(periods).sort((a, b) => b[1] - a[1])[0][0];
    res.json({
      question: "What time of day has the highest number of crashes?",
      answer: peakPeriod
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q2 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties.TOTAL_VEHICLES');
    const total = crashes.reduce((sum, c) => sum + (c.properties.TOTAL_VEHICLES || 0), 0);
    const avg = (total / crashes.length).toFixed(2);
    res.json({ question: "What is the average number of vehicles involved in crashes?", answer: avg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q3 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties.TOTAL_PEDESTRIANS');
    const total = crashes.length;
    const withPedestrians = crashes.filter(c => (c.properties.TOTAL_PEDESTRIANS || 0) > 0).length;
    const percentage = ((withPedestrians / total) * 100).toFixed(2);
    res.json({ question: "What percentage of crashes involved pedestrians?", answer: `${percentage}%` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q4 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties.WARD');
    const wardCounts = {};

    crashes.forEach(c => {
      const ward = c.properties.WARD || 'Unknown';
      wardCounts[ward] = (wardCounts[ward] || 0) + 1;
    });

    const topWard = Object.entries(wardCounts).sort((a, b) => b[1] - a[1])[0][0];
    res.json({ question: "Which ward has the highest number of crashes?", answer: topWard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q5 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties.WARD');
    const total = crashes.length;
    const ward2 = crashes.filter(c => c.properties.WARD === 'Ward 2').length;
    const percentage = ((ward2 / total) * 100).toFixed(2);
    res.json({ question: "What percentage of crashes occurred in Ward 2?", answer: `${percentage}%` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q6 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties');
    const totalCrashes = crashes.length;
    let totalInjuries = 0;

    crashes.forEach(c => {
      const p = c.properties;
      totalInjuries +=
        (p.MAJORINJURIES_BICYCLIST || 0) +
        (p.MINORINJURIES_BICYCLIST || 0) +
        (p.UNKNOWNINJURIES_BICYCLIST || 0) +
        (p.MAJORINJURIES_DRIVER || 0) +
        (p.MINORINJURIES_DRIVER || 0) +
        (p.UNKNOWNINJURIES_DRIVER || 0) +
        (p.MAJORINJURIES_PEDESTRIAN || 0) +
        (p.MINORINJURIES_PEDESTRIAN || 0) +
        (p.UNKNOWNINJURIES_PEDESTRIAN || 0) +
        (p.MAJORINJURIESPASSENGER || 0) +
        (p.MINORINJURIESPASSENGER || 0) +
        (p.UNKNOWNINJURIESPASSENGER || 0) +
        (p.MAJORINJURIESOTHER || 0) +
        (p.MINORINJURIESOTHER || 0) +
        (p.UNKNOWNINJURIESOTHER || 0);
    });

    const avg = (totalInjuries / totalCrashes).toFixed(2);
    res.json({ question: "What is the average number of injuries per crash?", answer: avg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q7 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties.ADDRESS');
    const locationCounts = {};

    crashes.forEach(c => {
      const address = c.properties.ADDRESS || 'Unknown';
      locationCounts[address] = (locationCounts[address] || 0) + 1;
    });

    const topLocation = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0][0];
    res.json({ question: "What is the most frequent crash location?", answer: topLocation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.q8 = async (req, res) => {
  try {
    const crashes = await Crash.find({}, 'properties');
    const fatalCrashes = crashes.filter(c => {
      const p = c.properties;
      return (
        (p.FATAL_BICYCLIST || 0) > 0 ||
        (p.FATAL_DRIVER || 0) > 0 ||
        (p.FATAL_PEDESTRIAN || 0) > 0 ||
        (p.FATALPASSENGER || 0) > 0 ||
        (p.FATALOTHER || 0) > 0
      );
    });

    res.json({ question: "How many crashes resulted in fatalities?", answer: fatalCrashes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};