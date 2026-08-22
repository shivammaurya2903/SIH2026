const validateRequired = (fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || String(value).trim() === '';
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
        fields: missingFields
      });
    }

    next();
  };
};

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const mongoose = require('mongoose');

    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName}`
      });
    }

    next();
  };
};

module.exports = {
  validateRequired,
  validateObjectId
};