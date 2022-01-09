const validator = require("../validators/recordsValidator");

describe("A valid request", () => {
  it("should return no validation errors", () => {
    const request = {
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      minCount: 1,
      maxCount: 99,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toBeUndefined();
  });
});

describe("An invalid request with", () => {
  it("invalid startDate should return validation error", () => {
    const request = {
      startDate: "invalid date",
      endDate: "2022-12-31",
      minCount: 1,
      maxCount: 99,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(expect.stringContaining("startDate"));
  });

  it("invalid endDate should return validation error", () => {
    const request = {
      startDate: "2022-01-01",
      endDate: "invalid date",
      minCount: 1,
      maxCount: 99,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(expect.stringContaining("endDate"));
  });

  it("startDate greater than endDate should return validation error", () => {
    const request = {
      startDate: "2022-01-02",
      endDate: "2022-01-01",
      minCount: 1,
      maxCount: 99,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(expect.stringContaining("endDate"));
  });

  it("minCount smaller than 0 should return validation error", () => {
    const request = {
      startDate: "2022-01-02",
      endDate: "2022-01-01",
      minCount: -1,
      maxCount: 99,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(expect.stringContaining("minCount"));
  });

  it("minCount greater maxCount should return validation error", () => {
    const request = {
      startDate: "2022-01-02",
      endDate: "2022-01-01",
      minCount: 10,
      maxCount: 9,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(expect.stringContaining("maxCount"));
  });

  it("additional properties should return validation error", () => {
    const request = {
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      minCount: 1,
      maxCount: 99,
      myNewProp: 100,
    };
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(
      expect.stringContaining("must NOT have additional properties")
    );
  });

  it("missing all properties should return validation error for all properties", () => {
    const request = {};
    const validationResult = validator.validateRecord(request);
    expect(validationResult).toEqual(expect.stringContaining("startDate"));
    expect(validationResult).toEqual(expect.stringContaining("endDate"));
    expect(validationResult).toEqual(expect.stringContaining("minCount"));
    expect(validationResult).toEqual(expect.stringContaining("maxCount"));
  });
});
