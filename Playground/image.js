 const download = require('image-downloader');
 const Jimp = require('jimp');
 const sharp = require('sharp');


 let url = "https://dipsims.com/public/img/slideshow/slide3-bg.png";

 download.image({
         url: url,
         dest: "./public/images"
     })
     .then(({ filename, image }) => {
         //  console.log(image);
         return image;
     })
     .then((image) => {
         sharp(image)
             .resize(50, 50)
             .then((img) => {
                 res.send(img);
                 return img;
             })
     })
     .then((image) => {
         console.log(image);
     })
     .catch((err) => {
         console.log(err);
         //  res.status(404).send()
     })

 //  fs.readFile('./public/images/Kano-Nigeria-11-640x400.jpg', (err, res) => {
 //      if (err) {
 //          return console.log(err);
 //      }
 //      console.log(res);
 //  })

 //  const image2base64 = require('image-to-base64');
 //  let url = image2base64("./public/images/Kano-Nigeria-11-640x400.jpg")
 //      .then((response) => console.log(response))
 //      .then((res) => { return res; })
 //      .catch((error) => console.log(error))

 //  var images = require("images");

 //  let url = images("./public/images/Kano-Nigeria-11-640x400.jpg")
 //  console.log(url)