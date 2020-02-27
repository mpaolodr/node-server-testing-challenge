const request = require("supertest");
const server = require("./server.js");
const db = require("../data/db-config.js");

describe("server", () => {
  it("runs the tests", () => {
    expect(true).toBe(true);
  });

  it("should use testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });

  describe("POST to /api/users", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("returns status 201 CREATED", () => {
      return request(server)
        .post("/api/users")
        .send({ name: "TEST NAME" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("returns status 400 BAD REQUEST", () => {
      return request(server)
        .post("/api/users")
        .send({})
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("returns JSON", () => {
      return request(server)
        .post("/api/users")
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });

  describe("DELETE to /api/users", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("returns status 200", () => {
      return request(server)
        .post("/api/users")
        .send({ name: "TEST DELETE" })
        .then(res => {
          return request(server)
            .delete(`/api/users/${res.id}`)
            .then(response => {
              expect(response.status).toBe(200);
            });
        });
    });

    it("returns message after successful delete", () => {
      return request(server)
        .post("/api/users")
        .send({ name: "TEST DELETE" })
        .then(res => {
          return request(server)
            .delete(`/api/users/${res.id}`)
            .then(response => {
              expect(response.body.message).toBe("User deleted!");
            });
        });
    });

    it("returns JSON", () => {
      return request(server)
        .post("/api/users")
        .send({ name: "TEST DELETE" })
        .then(res => {
          return request(server)
            .delete(`/api/users/${res.id}`)
            .then(response => {
              expect(response.type).toMatch(/json/);
            });
        });
    });
  });
});
