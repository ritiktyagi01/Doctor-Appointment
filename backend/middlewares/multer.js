import multer from 'multer';

const storage = multer.diskStorage({
   // this is used when we want where the file to be stored
    // destination: function(req,file,cb){ 
    //     cb(null,'multer/');
    // },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage:storage});
export default upload;