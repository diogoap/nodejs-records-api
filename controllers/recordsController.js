const validator = require("../validators/recordsValidator");
const service = require("../services/recordsService");
const model = require("../models/findRecordsRequest");

const findRecords = function (req, res) {
  try {
    const body = req.body;
    const validationResult = validator.validateRecord(body);

    if (validationResult) {
      return res.status(400).json(buildResponse(400, validationResult, []));
    }

    const startDate = new Date(body.startDate);
    const endDate = getEndOfDay(new Date(body.endDate));
    const request = new model.findRecordsRequest(
      startDate,
      endDate,
      body.minCount,
      body.maxCount
    );

    new service.findRecords(request)
      .then(function (records) {
        return res.json(buildResponse(0, "Success", records));
      })
      .catch(function (error) {
        return res
          .status(500)
          .json(
            buildResponse(
              500,
              error.toString() ?? "Cannot fetch data from database",
              []
            )
          );
      });
  } catch (error) {
    return res
      .status(500)
      .json(
        buildResponse(500, error.toString() ?? "Internal Server Error", [])
      );
  }
};

function buildResponse(code, msg, records) {
  return {
    code: code,
    msg: msg,
    records: records ?? [],
  };
}

function getEndOfDay(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
}

module.exports = { findRecords };
