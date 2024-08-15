const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: 'diytjehvp',
    api_key: '896537927661246',
    api_secret: 'njG4uY6DuG-8ZzdZrdYA5dUWOqg'
});

// Storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name', // Optional folder name in Cloudinary
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

module.exports = upload;
