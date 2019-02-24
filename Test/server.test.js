const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const { app } = require('../server/server');


describe('POST /users/login', () => {
    it("login user with valid credentials", (done) => {
        let email = "rootuser@email.com";
        let password = "rootuser";
        // console.log(email);
        request(app)
            .post('/user/login')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end(done);

    })

    it("Should return validation errors", (done) => {
        let email = "email.com";
        let password = "rootuser";
        // console.log(email);
        request(app)
            .post('/user/login')
            .send({ email, password })
            .expect(400)
            .expect((res) => {
                expect(res.body.email).not.toBe(email);
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end(done);
    })
})

describe('PATCH user/patch', () => {
    it("should update user document", (done) => {
        let userId = 00247;
        let token = jwt.sign({ _id: userId, access: "auth" }, "tokenfy").toString();
        request(app)
            .patch('/user/patch')
            .set({ 'x-auth': token })
            .expect(200)
            .expect((res) => {
                expect(res).toBeTruthy();
            })
            .end(done)
    })

    it("should return unauthorized access", (done) => {
        request(app)
            .patch('/user/patch')
            .expect(401)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end(done)
    })
})

describe("POST user/me/image", () => {
    it("Should return an image", function(done) {
        this.timeout(0);
        let userId = 00247;
        let token = jwt.sign({ _id: userId, access: "auth" }, "tokenfy").toString();

        request(app)
            .post('/user/me/image')
            .set({ 'x-auth': token })
            .send({ url: "http://nhubnigeria.com/img/retnan.jpg" })
            .expect(200)
            .expect((res) => {
                expect(res).toBeTruthy();
            })
            .end((err) => done(err))
    })
    it("should return unauthorized access", (done) => {
        request(app)
            .post('/user/me/image')
            .expect(401)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end(done)
    })
})