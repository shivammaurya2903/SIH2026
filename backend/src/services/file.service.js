const fs = require('fs');
const path = require('path');

const deleteFile = async (filePath) => {
  if (!filePath) {
    return false;
  }

  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    return false;
  }

  await fs.promises.unlink(absolutePath);

  return true;
};

const getFileUrl = (filename) => {
  if (!filename) {
    return null;
  }

  return `/uploads/${filename}`;
};

const { uploadImageToCloudinary, deleteImageFromCloudinary, isConfigured: isCloudinaryConfigured } = require('./cloudinary.service');

const formatFileMetadata = (file, userId = null, cloudinaryData = null) => {
  if (!file) return null;

  const isImage = (file.mimetype || '').startsWith('image/');
  const localUrl = getFileUrl(file.filename || path.basename(file.path || ''));

  return {
    name: file.originalname || file.name || file.filename,
    originalName: file.originalname || file.name || file.filename,
    filename: file.filename || path.basename(file.path || ''),
    url: cloudinaryData?.secureUrl || localUrl,
    secureUrl: cloudinaryData?.secureUrl || localUrl,
    publicId: cloudinaryData?.publicId || null,
    resourceType: isImage ? 'image' : 'document',
    mimeType: file.mimetype || file.type || 'application/octet-stream',
    format: cloudinaryData?.format || path.extname(file.originalname || '').replace('.', ''),
    size: file.size || 0,
    width: cloudinaryData?.width || null,
    height: cloudinaryData?.height || null,
    uploadedBy: userId || null,
    uploadedAt: new Date()
  };
};

const extractUploadedFiles = (req, fieldName, existingArray = []) => {
  let result = [];

  if (typeof existingArray === 'string') {
    try {
      const parsed = JSON.parse(existingArray);
      if (Array.isArray(parsed)) {
        result = parsed.filter((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
      } else if (typeof parsed === 'object' && parsed !== null) {
        result = [parsed];
      }
    } catch (e) {
      result = [];
    }
  } else if (Array.isArray(existingArray)) {
    result = existingArray.filter((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
  }

  if (req.files && Array.isArray(req.files)) {
    req.files.forEach((file) => {
      if (file.fieldname === fieldName || !fieldName) {
        result.push(formatFileMetadata(file, req.user?._id));
      }
    });
  } else if (req.files && typeof req.files === 'object') {
    if (req.files[fieldName] && Array.isArray(req.files[fieldName])) {
      req.files[fieldName].forEach((file) => {
        result.push(formatFileMetadata(file, req.user?._id));
      });
    }
  } else if (req.file) {
    if (req.file.fieldname === fieldName || !fieldName) {
      result.push(formatFileMetadata(req.file, req.user?._id));
    }
  }

  return result.filter((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
};

const processAndUploadFiles = async (req, fieldName, existingArray = []) => {
  let filesToProcess = [];

  if (req.files && Array.isArray(req.files)) {
    filesToProcess = req.files.filter(f => f.fieldname === fieldName || !fieldName);
  } else if (req.files && typeof req.files === 'object' && req.files[fieldName]) {
    filesToProcess = req.files[fieldName];
  } else if (req.file && (req.file.fieldname === fieldName || !fieldName)) {
    filesToProcess = [req.file];
  }

  const existing = extractUploadedFiles(req, fieldName, existingArray);
  const newlyUploaded = [];

  for (const file of filesToProcess) {
    const isImage = (file.mimetype || '').startsWith('image/');
    let cRes = null;

    if (isImage && isCloudinaryConfigured && file.path) {
      try {
        cRes = await uploadImageToCloudinary(file.path);
      } catch (err) {
        console.error('Failed to upload image to Cloudinary:', err.message);
      }
    }

    const meta = formatFileMetadata(file, req.user?._id, cRes);
    newlyUploaded.push(meta);
  }

  return [...existing, ...newlyUploaded];
};

const rollbackCloudinaryUploads = async (attachments = []) => {
  if (!Array.isArray(attachments)) return;
  for (const att of attachments) {
    if (att && att.publicId) {
      await deleteImageFromCloudinary(att.publicId);
    }
  }
};

module.exports = {
  deleteFile,
  getFileUrl,
  formatFileMetadata,
  extractUploadedFiles,
  processAndUploadFiles,
  rollbackCloudinaryUploads
};