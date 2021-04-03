const express = require ('express');
const multer = require ('multer');
const isAuth = require ('../middleware/auth');
const {
  getAllProducts,
  createProduct,
  getProduct,
  patchProduct,
  deleteProduct,
} = require ('../controllers/products');

const router = express.Router ();

const storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    cb (null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb (null, Date.now () + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //accept a file
  if (file.mimetype === 'image/jepg' || file.mimetype === 'image/png') {
    cb (null, true);
  } else {
    //reject a file
    cb (null, false);
  }
};

const upload = multer ({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get ('/', getAllProducts);

router.post ('/', isAuth, upload.single ('productImage'), createProduct);

router.get ('/:id', getProduct);

router.patch ('/:id', isAuth, patchProduct);

router.delete ('/:id', isAuth, deleteProduct);

module.exports = router;
