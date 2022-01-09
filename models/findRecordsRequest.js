class findRecordsRequest {
  constructor(startDate, endDate, minCount, maxCount) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.minCount = minCount;
    this.maxCount = maxCount;
  }
}

module.exports = { findRecordsRequest };