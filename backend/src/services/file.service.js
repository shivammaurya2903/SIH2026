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

module.exports = {
  deleteFile,
  getFileUrl
};