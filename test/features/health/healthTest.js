const chai = require("chai");
const sinon = require("sinon");
require("dotenv").config();

const envName = process.env.ENV_NAME;
const port = process.env.PORT;

const HealthController = require("../../../src/features/health/health.controller");
const ResponseUtil = require("../../../src/shared/utils/response-util")
  .ResponseUtil;

describe("HealthController", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("#helloWorld()", () => {
    it("respond with Hello World", (done) => {
      sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
        chai.assert.equal(message, "Hello World");
        done();
      });

      void HealthController.helloWorld();
    });
  });
  describe("#status()", () => {
    it("respond with status message", (done) => {
      sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
        chai.assert.equal(
          message,
          `Environment '${envName}' running on port: ${port}`
        );
        done();
      });

      void HealthController.status();
    });
  });
  describe("#error()", () => {
    it("respond with an error", (done) => {
      sinon
        .stub(ResponseUtil, "respondError")
        .callsFake((res, data, message) => {
          chai.assert.equal(message, "error");
          done();
        });

      void HealthController.error();
    });
  });
});
