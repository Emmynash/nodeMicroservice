const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const jsonpath = require('json-patch');
const jwt = require('jsonwebtoken');
const download = require('image-downloader');
const validator = require('validator');

const { authenticate } = require('./middleware/authenticate');
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json());

// POST /uer/login route (Login valid user)
app.post('/user/login', (req, res) => {

    try {
        // pick email & password set by user
        let body = _.pick(req.body, ['email', 'password'])

        // validate email & password
        if (!validator.isEmail(body.email)) {
            return res.status(400).send(`${body.email} does not exist`);
        } else if (body.password.length == 0) {
            return res.status(400).send(`Password is required!`);
        }

        // create a jsonwebtoken
        let userId = 00247;
        let token = jwt.sign({ _id: userId, access: "auth" }, "tokenfy").toString();

        // set 'x-auth' header with the token value and return the token
        res.header('x-auth', token).json({ success: true, token });

    } catch (error) {
        res.status(400).send({ success: false });
    }

})

// PATCH user/patch route (patch user document)
app.patch('/user/patch', authenticate, async(req, res) => {
    try {
        // pick age & sex values set by user
        let body = _.pick(req.body, ['age', 'sex'])

        let userDoc = { "age": "0", "sex": "undefine", "hobby": "Reading" };

        // update user document by setting new values for sex & age
        let patch = [
            { "op": "replace", "path": "/age", "value": body.age },
            { "op": "replace", "path": "/sex", "value": body.sex }
        ]

        // Patch the documents and return it to user
        let patchUserDoc = await jsonpath.apply(userDoc, patch);
        res.send(patchUserDoc);

    } catch (error) {
        res.status(400).send({ success: false });
    }
})

// POST user/me/image (download and return image)
app.post('/user/me/image', authenticate, (req, res) => {

    // pick the image url
    let body = _.pick(req.body, ['url']);

    // download the image and return it to user
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
            res.status(400).send({ success: false });
        })

})

app.listen(port, (err) => {
    if (err) {
        return console.log(`unable to connect to server on port ${port}, ${err}`)
    }
    console.log(`Server running on port ${port}`);
})

module.exports = { app };