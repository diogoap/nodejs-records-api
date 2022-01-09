const request = require("supertest");
const routes = require("../routes/routes");
const service = require("../services/recordsService");

jest.mock("../services/recordsService");

describe("GET health endpoint", () => {
  it("health endpoint should return ok", async () => {
    const res = await request(routes).get("/api/health").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.stringContaining("OK"));
  });
});

describe("POST records endpoint", () => {
  it("post records should return 400 when validation fails", async () => {
    const res = await request(routes).post("/api/records").send({
      startDate: "2022-01-01",
      endDate: "2022-01-31",
      minCount: 9999,
      maxCount: 1,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", 400);
    expect(res.body).toHaveProperty("msg");
    expect(res.body).toHaveProperty("records", []);
  });

  it("post records should return 200 and proper code, msg and records", async () => {
    var records = [
      {
        key: "key1",
        createdAt: "2022-01-10T09:32:31.203Z",
        totalCount: 100,
      },
      {
        key: "key2",
        createdAt: "2022-01-10T13:33:22.352Z",
        totalCount: 200,
      },
    ];

    service.findRecords.mockImplementation(() => Promise.resolve(records));

    const res = await request(routes).post("/api/records").send({
      startDate: "2022-01-01",
      endDate: "2022-01-31",
      minCount: 1,
      maxCount: 10,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("code", 0);
    expect(res.body).toHaveProperty("msg", "Success");
    expect(res.body).toHaveProperty("records", records);
  });

  it("post records should return 500 when database call fails", async () => {
    service.findRecords.mockImplementation(() =>
      Promise.reject("Some error happened")
    );

    const res = await request(routes).post("/api/records").send({
      startDate: "2022-01-01",
      endDate: "2022-01-31",
      minCount: 1,
      maxCount: 10,
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("msg", "Some error happened");
    expect(res.body).toHaveProperty("records", []);
  });

  it("post records should return 500 when error is thrown", async () => {
    service.findRecords.mockImplementation(() => {
      throw new Error("Error was thrown");
    });

    const res = await request(routes).post("/api/records").send({
      startDate: "2022-01-01",
      endDate: "2022-01-31",
      minCount: 1,
      maxCount: 10,
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("msg", "Error: Error was thrown");
    expect(res.body).toHaveProperty("records", []);
  });
});
