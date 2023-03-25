import multer, { diskStorage } from "multer";

var multerStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `img-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
});
export default upload;
