const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname || 'file';
    const ext = path.extname(originalName).toLowerCase();
    
    // Strip all directory traversal, slashes, null bytes and dangerous characters
    const cleanBaseName = path
      .basename(originalName, ext)
      .replace(/[\0\r\n]/g, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 50);

    const safeFilename = `${Date.now()}_${Math.floor(Math.random() * 1e9)}_${cleanBaseName}${ext}`;
    cb(null, safeFilename);
  }
});

const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.pdf',
  '.doc',
  '.docx',
  '.mp4',
  '.webm'
];

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'video/mp4',
  'video/webm'
];

const REJECTED_EXTENSIONS = [
  '.exe',
  '.bat',
  '.cmd',
  '.sh',
  '.js',
  '.html',
  '.htm',
  '.php',
  '.dll',
  '.msi',
  '.vbs',
  '.ps1'
];

const fileFilter = (req, file, cb) => {
  const originalName = file.originalname || '';
  const ext = path.extname(originalName).toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();

  if (REJECTED_EXTENSIONS.includes(ext) || originalName.includes('\0')) {
    return cb(new Error(`Security Warning: Executable or script format '${ext}' is strictly prohibited.`), false);
  }

  if (ALLOWED_EXTENSIONS.includes(ext) && ALLOWED_MIME_TYPES.includes(mime)) {
    return cb(null, true);
  }

  return cb(new Error(`Unsupported file format or MIME type: ${ext} (${mime})`), false);
};

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
});

const handleUploadError = (err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: `File size exceeds maximum permitted limit of 50MB`,
        errors: [{ msg: err.message }]
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error',
      errors: [{ msg: err.message }]
    });
  }
  next();
};

module.exports = {
  upload,
  handleUploadError
};