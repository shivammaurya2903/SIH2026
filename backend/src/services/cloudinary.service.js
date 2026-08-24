const fs = require('fs');
const { cloudinary, isConfigured } = require('../config/cloudinary');

/**
 * Uploads a local file to Cloudinary and deletes local temp file if configured
 * @param {string} filePath - Path to local file
 * @param {string} folder - Target Cloudinary folder
 * @returns {Promise<Object>} Metadata containing secureUrl, publicId, etc.
 */
const uploadImageToCloudinary = async (filePath, folder = 'jharinnovate/challenges/images') => {
  if (!isConfigured) {
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'image',
      use_filename: true,
      unique_filename: true,
      overwrite: false
    });

    // Delete local temp file after successful upload to Cloudinary
    if (fs.existsSync(filePath)) {
      try {
        await fs.promises.unlink(filePath);
      } catch (e) {}
    }

    return {
      secureUrl: result.secure_url,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      size: result.bytes,
      resourceType: result.resource_type || 'image'
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error.message);
    throw error;
  }
};

/**
 * Safely deletes an image asset from Cloudinary by its publicId
 * @param {string} publicId - Cloudinary asset public ID
 */
const deleteImageFromCloudinary = async (publicId) => {
  if (!isConfigured || !publicId) {
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
    return false;
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
  isConfigured
};
