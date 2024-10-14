const sharp = require('sharp');
const fs = require('fs');
const Profile = require('../models/Profile');

const updateProfile = async (req, res) => {
    try {
        const { name, bio } = req.body;
        let profileImage = null;

        if (req.file) {
            // Resize and compress the image
            const filePath = `uploads/resized-${Date.now()}-${req.file.originalname}`;
            await sharp(req.file.path)
                .resize(300, 300)  // Resize to 300x300 pixels
                .jpeg({ quality: 80 })  // Compress to 80% quality
                .toFile(filePath);

            // Delete the original uploaded file
            fs.unlinkSync(req.file.path);
            profileImage = filePath;
        }

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { name, bio, profileImage },
            { new: true }
        );

        res.status(200).json({ message: 'Profile updated', profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { updateProfile };
