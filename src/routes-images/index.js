const { Router } = require('express');
const router = Router();
const path = require('path');
const {unlink} = require('fs-extra');

const Image = require('../app/models/image');

router.get('/login', async(req, res) => {
    const images = await Image.find();
    res.render('wall', {images});
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async(req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();

    res.redirect('/login');
});

router.get('/image/:id', async(req, res) => {
    const {id} = req.params;
    const image = await Image.findById(id);
    console.log(image);
    res.render('image-profile', {image});
});

router.get('/image/:id/delete', async(req, res) => {
    const {id} = req.params;
    const image = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + image.path));
    res.redirect('/login');
});

module.exports = router;