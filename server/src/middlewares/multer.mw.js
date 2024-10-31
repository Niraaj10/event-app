import multer from 'multer'
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Navigate from src/middleware to the public folder
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, '../../public/temp');
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });


// export const upload = multer({ storage })



const uploadDirectory = path.resolve('uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary storage before Cloudinary upload
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});



const upload = multer({
  storage
});

export default upload;