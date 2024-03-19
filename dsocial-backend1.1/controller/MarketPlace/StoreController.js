const Store = require("../../models/MarketPlace/Store");
const multer = require("multer");
const axios = require("axios");
const cheerio = require("cheerio");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/store");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStoreMedia = multer({ storage: storage });

const saveStore = async (req, res) => {
  const files = req.file;
  let filenames = "";
  if (files) {
    filenames = files.filename;
  }

  const store = new Store({
    category_name: req.body?.category_name,
    page_id: req.body?.page_id,
    name: req.body?.name,
    description: req.body?.description,
    image_path: filenames,
    user_id: req.userId,
    status: 1,
  });
  await store.save();
  // console.log(req.file);
  res
    .status(200)
    .json({ message: "Store Save successfully", status: 200, data: store });
};

const getAllStore = async (req, res) => {
  res.status(200).json({
    message: "Store Save successfully",
    status: 200,
    data: await Store.find({
      user_id: req.userId,
    }).sort({ _id: -1 }),
  });
};

const deleteStore = async (req, res) => {
  try {
    const storeDelete = await Store.deleteOne({ _id: req.body.store_id });
    res.status(200).json({
      message: "Store delete successfully",
      status: 200,
    });
  } catch (erro) {
    res.status(200).json({
      message: "Something went wrong",
      status: 201,
    });
  }
};

const updateStore = async (req, res) => {
  const files = req.file;
  let filenames = "";
  if (files) {
    filenames = files.filename;
  }

  try {
    const storeUpdate = await Store.findOneAndUpdate(
      { _id: req.body.store_id },
      {
        category_name: req.body?.category_name,
        page_id: req.body?.page_id,
        name: req.body?.name,
        description: req.body?.description,
        image_path: filenames,
        user_id: req.userId,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Store Update successfully",
      data: storeUpdate,
      status: 200,
    });
  } catch (erro) {
    res.status(200).json({
      message: "Something went wrong",
      status: 201,
    });
  }
};

const getUrl = async (req, res) => {
  try {
    // Make an HTTP request to fetch the HTML content of the page
    // console.log(1);
    const url = "https://github.com";
    const response = await axios.get(url);
    console.log(2);
    const html = response.data;
    // console.log(response);
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    // Extract title
    const title = $("head title").text().trim();

    // Extract meta description
    const description = $('meta[name="description"]').attr("content") || "";

    // Extract thumbnail image
    let thumbnail = $('meta[property="og:image"]').attr("content");
    if (!thumbnail) {
      // If og:image meta tag is not present, try to find other image tags
      thumbnail = $("img").attr("src") || "";
    }
    res.status(200).json({
      message: "Link Url",
      status: 200,
      data: {
        title,
        description,
        thumbnail,
      },
    });
  } catch (error) {
    console.error("Error fetching link details:", error.message);
    return null;
  }
};

module.exports = {
  saveStore,
  uploadStoreMedia,
  getAllStore,
  deleteStore,
  getUrl,
  updateStore,
};
