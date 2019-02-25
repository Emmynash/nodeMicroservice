const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const jsonpath = require('json-patch');
const jwt = require('jsonwebtoken');
const download = require('image-downloader');
const validator = require('validator');

const { authenticate } = require('./middleware/authenticate');
const app = express();
const port = 8080 || process.env.PORT;


app.use(bodyParser.json());

app.post('/user/login', (req, res) => {

    try {
        let body = _.pick(req.body, ['email', 'password'])

        if (!validator.isEmail(body.email)) {
            return res.status(400).send(`${body.email} does not exist`);
        } else if (body.password.length == 0) {
            return res.status(400).send(`Password is required!`);
        }

        let userId = 00247;
        let token = jwt.sign({ _id: userId, access: "auth" }, "tokenfy").toString();

        res.header('x-auth', token).send(token);

    } catch (error) {
        res.status(400).send();
    }

})

app.patch('/user/patch', authenticate, async(req, res) => {
    try {
        let body = _.pick(req.body, ['age', 'sex'])
        let userDoc = { "age": "0", "sex": "undefine", "hobby": "Reading" };
        let patch = [
            { "op": "replace", "path": "/age", "value": body.age },
            { "op": "replace", "path": "/sex", "value": body.sex }
        ]

        let patchUserDoc = await jsonpath.apply(userDoc, patch);
        res.send(patchUserDoc);

    } catch (error) {
        res.status(400).send();
    }
})

app.post('/user/me/image', authenticate, (req, res) => {

    let body = _.pick(req.body, ['url']);

    download.image({
            url: body.url,
            dest: "./public/images"
        })
        .then(({ filename, image }) => {
            res.setHeader('Content-Type', 'image/jpg');
            res.send(image);
            return image;
        })
        .catch((err) => {
            res.status(400).send(err)
        })

})

app.listen(port, (err) => {
    if (err) {
        return console.log(`unable to connect to server on port ${port}, ${err}`)
    }
    console.log(`Server running on port ${port}`);
})

module.exports = { app };