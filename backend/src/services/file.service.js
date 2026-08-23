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

const formatFileMetadata = (file, userId = null) => {
  if (!file) return null;

  return {
    name: file.originalname || file.name || file.filename,
    originalName: file.originalname || file.name || file.filename,
    filename: file.filename || path.basename(file.path || ''),
    url: getFileUrl(file.filename || path.basename(file.path || '')),
    type: file.mimetype || file.type || 'application/octet-stream',
    mimeType: file.mimetype || file.type || 'application/octet-stream',
    size: file.size || 0,
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

module.exports = {
  deleteFile,
  getFileUrl,
  formatFileMetadata,
  extractUploadedFiles
};