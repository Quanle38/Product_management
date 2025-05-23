const multer = require('multer');
module.exports = ()=> {
    const storage = multer.diskStorage({
        destination : function (req,file,cb) {
            cb(null,"./public/admin/uploads/");
        }, 
        filename : function (req,file,cb ) {
            const date = Date.now();
            cb(null,`${date}-${file.originalname}`)
        }
    });
    return storage;
}