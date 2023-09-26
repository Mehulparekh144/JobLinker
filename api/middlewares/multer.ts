import multer from 'multer'

const storage = multer.memoryStorage();
const multerUploader = multer({ storage })

export default multerUploader;