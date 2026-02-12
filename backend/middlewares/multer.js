// import multer from 'multer';

// const storage = multer.diskStorage({
//    // this is used when we want where the file to be stored
//     // destination: function(req,file,cb){ 
//     //     cb(null,'multer/');
//     // },
//     filename: function(req,file,cb){
//         cb(null,Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({storage:storage});
// export default upload;

import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit (recommended)
});

export default upload;