const { uploadImage } = require('../utils/cloudinary');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const defaultImageUrl = 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png';

const createNewUser = async (email, password, firstName, lastName, phoneNumber, profilePicture) => {
    let imageUrl = defaultImageUrl;
    phoneNumber = phoneNumber || '';
    if (profilePicture) {
        imageUrl = await uploadImage(profilePicture);
    }

    const salt = await bcrypt.genSalt(process.env.SaltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({email, password: hashedPassword, firstName, lastName, phoneNumber, imageUrl}).save();
    return newUser;
}

module.exports = {
    createNewUser,
}