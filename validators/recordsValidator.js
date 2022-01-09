const Ajv = require("ajv");
const addFormats = require("ajv-formats");

var recordsValidationSchema = {
  type: "object",
  properties: {
    startDate: {
      type: "string",
      format: "date",
    },
    endDate: {
      type: "string",
      format: "date",
      formatMinimum: { $data: "1/startDate" },
    },
    minCount: {
      type: "integer",
      minimum: 1,
    },
    maxCount: {
      type: "integer",
      minimum: { $data: "1/minCount" },
    },
  },
  required: ["startDate", "endDate", "minCount", "maxCount"],
  additionalProperties: false,
};

function getFormattedError(instancePath, errorMessage) {
  if (instancePath.length > 0) {
    return `${instancePath}: ${errorMessage}`;
  } else {
    return errorMessage;
  }
}

module.exports = {
  validateRecord: function (req) {
    const ajv = new Ajv({ $data: true, allErrors: true });
    addFormats(ajv);
    const validate = ajv.compile(recordsValidationSchema);
    validate(req);
    return validate.errors
      ?.map((err) => getFormattedError(err.instancePath, err.message))
      .join(", ");
  },
};
