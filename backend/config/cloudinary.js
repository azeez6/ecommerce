const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'diytjehvp',
    api_key: '896537927661246',
    api_secret: 'njG4uY6DuG-8ZzdZrdYA5dUWOqg'
});

module.exports = cloudinary;
