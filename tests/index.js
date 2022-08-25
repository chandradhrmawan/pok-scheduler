import chai from "chai"
import chaiHttp from "chai-http"
import { app } from "../app.js"

chai.use(chaiHttp);
chai.should();

describe("joybox-tests-apis", () => {
    describe("/api/books/get", () => {
        it("should get all books", (done) => {
            chai.request(app)
                .get("/api/books/get")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("/api/books/get?genre=", () => {
        it("should get all books", (done) => {
            chai.request(app)
                .get("/api/books/get?genre=")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("/api/books/get?genre=Suicide", () => {
        it("should get filter books by genre", (done) => {
            chai.request(app)
                .get("/api/books/get?genre=Suicide")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should return an empty array", (done) => {
            chai.request(app)
                .get("/api/books/get?genre=must be empty")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe(`/api/books/multi/get?genre=["Unterrichtseinheit","Classic fiction","Murder victims' families"]`, () => {
        it("should get filter books by multiple genre", (done) => {
            chai.request(app)
                .get(`/api/books/multi/get?genre=["Unterrichtseinheit","Classic fiction","Murder victims' families"]`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should return an empty array", (done) => {
            chai.request(app)
                .get(`/api/books/multi/get?genre=["must empty"]`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe(`/api/booking/save`, () => {
        it("save user booking request", (done) => {
            chai.request(app)
                .post(`/api/booking/save`)
                .send({
                    "cover_id": 8257991,
                    "start_booking": "2022-07-28 10:33:30",
                    "end_booking": "2022-07-29 10:33:30"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("validate payload booking request", (done) => {
            chai.request(app)
                .post(`/api/booking/save`)
                .send({
                    "cover_id": 8257991,
                    "start_booking": "2022-37-28 10:33:30",
                    "end_booking": "2015-27-29 10:33:30"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("/api/booking/get", () => {
        it("should get all user booking request data", (done) => {
            chai.request(app)
                .get("/api/booking/get")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


});