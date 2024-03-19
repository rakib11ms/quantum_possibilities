const StoreProduct = require("../../models/MarketPlace/StoreProduct");
const StoreProductVariant = require("../../models/MarketPlace/StoreProductVariant");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProductMedia = multer({ storage: storage });

const saveProduct = async (req, res) => {
  const storeProduct = new StoreProduct({
    product_name: req.body?.product_name,
    category_name: req.body?.category_name,
    brand_name: req.body?.brand_name,
    unit: req.body?.unit,
    weight: req.body?.weight,
    description: req.body?.description,
    image_path: req.body?.image_path,
    price: req.body?.price,
    discount_type: req.body?.discount_type,
    discount: req.body?.discount,
    tax: req.body?.tax,
    vat: req.body?.vat,
    product_store: req.body?.product_store,
    status: req.body?.status,
    product_condition: req.body?.product_condition,
    shipping_method: req.body?.shipping_method,
    is_physical_product: req.body?.is_physical_product,
    shipping_weight: req.body?.shipping_weight,
    shipping_height: req.body?.shipping_height,
    length: req.body?.length,
    width: req.body?.width,
    // user_id: req.userId,
    status: 1,
  });
  await storeProduct.save();
  // console.log(req.file);
  const variantData = req.body?.variant || [];

  const productVariants = variantData.map(
    (variant) =>
      new StoreProductVariant({
        color: variant.color,
        size: variant.size,
        attributes: variant.attributes,
        price: variant.price,
        product_id: storeProduct._id,
      })
  );
  await StoreProductVariant.insertMany(productVariants);

  res.status(200).json({
    message: "Product Save successfully",
    status: 200,
    data: storeProduct,
  });
};

const getAllProduct = async (req, res) => {
  res.status(200).json({
    message: "Store Save successfully",
    status: 200,
    data: await StoreProduct.find({
      user_id: { $ne: req.userId },
    })
      .populate("product_store")
      .sort({ _id: -1 }),
  });
};

const getSingleProduct = async (req, res) => {
  let data = await StoreProduct.findOne({
    _id: req.body.product_id,
  })
    .populate("product_store")
    .populate({
      path: "user_id",
      model: "User",
      select: "username"
    })
    .sort({ _id: -1 })
    .lean();

  if (data && data.user_id && data.user_id.username) {
    data.ownerName = data.user_id.username;
  }

  delete data.user_id;

  res.status(200).json({
    message: "Store Save successfully",
    status: 200,
    data: data,
  });
};

const deleteProduct = async (req, res) => {
  try {
    const storeDelete = await StoreProduct.deleteOne({
      _id: req.body.product_id,
    });
    res.status(200).json({
      message: "Store delete successfully",
      status: 200,
    });
  } catch (error) {
    res.status(200).json({
      message: "Something went wrong",
      status: 201,
    });
  }
};

const productFileUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.filename; // The file path in the 'uploads/' folder

    // Process the file path as needed, save it to the database, or return it in the response
    res
      .status(200)
      .json({ message: "Image uploaded successfully", filePath: filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getSingleProduct,
  saveProduct,
  uploadProductMedia,
  deleteProduct,
  getAllProduct,
  productFileUpload,
};
