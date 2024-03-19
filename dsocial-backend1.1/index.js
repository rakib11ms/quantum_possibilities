require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./routes/route");
const order = require("./routes/orders/order");
const groups = require("./routes/groups/groups");
const campaign = require("./routes/campaigns/campaigns");
const settingsPrivacy = require("./routes/settings-privacy/settings-privacy");
const admin = require("./routes/admin/admin");

const app = express();
const server = http.createServer(app);

/**Socket Section Start*/
const { handleSocketConnection } = require("./socket");
const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://quantumpossibilities.eu",
    methods: ["GET", "POST"],
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // Adjust buffer size if necessary
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
  },
});

handleSocketConnection(io);
/**Socket Section End*/

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://quantumpossibilities.eu",
  // origin: "http://10.81.11.62:3000",
  // origin: "http://95.110.129.37:81",

  // origin: 'http://159.89.192.37:3000',
  credentials: true,
};


app.use(cors(corsOptions));
app.use("/admin", admin);
app.use("/api", route);
app.use("/order", order);
app.use("/api/groups", groups);
app.use("/api/campaign", campaign);
app.use("/api/settings-privacy", settingsPrivacy);

mongoose
  .connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
  