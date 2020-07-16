const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const uploadImage = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CloudName,
        api_key: process.env.CloudinaryAppKey, 
        api_secret: process.env.CloudinaryAppSecret,
    });

    const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/gif'];
    if (!validMimeTypes.includes(file.mimetype)) {
        throw 'Invalid image format!';
    }

    const cloudinaryUpload = async() => { await new Promise((resolve, reject) => {
            const cloudinaryStream = cloudinary.uploader.upload_stream(function (error, result) {
                if (result) {
                    resultUrl = result.secure_url;
                    resultSecureUrl = result.secure_url;
                    resolve(resultUrl)
                } else {
                    reject(error);
                }
            });

            streamifier.createReadStream(file.buffer).pipe(cloudinaryStream);
        });
    }

    await cloudinaryUpload();
    return resultUrl;
}

module.exports = {
    uploadImage
}