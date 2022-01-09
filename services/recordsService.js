const mongoose = require("mongoose");

const recordsModel = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [],
});

const recordsSchema = mongoose.model("Records", recordsModel);

module.exports = {
  findRecords: function (request) {
    return recordsSchema
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: request.startDate,
              $lte: request.endDate,
            },
          },
        },
        {
          $project: {
            _id: 0,
            key: "$key",
            createdAt: "$createdAt",
            totalCount: { $sum: "$counts" },
          },
        },
        {
          $match: {
            totalCount: {
              $gte: request.minCount,
              $lte: request.maxCount,
            },
          },
        },
        {
          $sort: {
            createdAt: 1,
            totalCount: 1,
          },
        },
      ])
      .exec();
  },
};
