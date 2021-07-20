const express = require("express");
const app = express();

// upload images plugin
var multer = require("multer");
var path = require("path");
var port = 5004;

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

const cors = require("cors");
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

const VacationsModel = require("./models/VacationsModel");
const UsersModel = require("./models/UsersModel");
const FollowsModel = require("./models/FollowsModel");

VacationsModel.hasMany(FollowsModel);
UsersModel.hasMany(FollowsModel);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const UsersRoute = require("./routs/usersRoute");
app.use("/users", UsersRoute);

const VacationsRoute = require("./routs/vacationRoute");
app.use("/vacations", VacationsRoute);

//FIXME: אם זה פועל זה משבית
// app.use((req, res) => {
//   res.send("Page NotFound");
// });

// specify the folder
app.use(express.static(path.join(__dirname, "uploads")));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let imgEnd = file.originalname.split(".");
    imgEnd = imgEnd[imgEnd.length - 1];
    console.log("imgEnd$$: ", imgEnd);

    let now = Date.now();
    console.log("hi check: ", file.originalname);
    // cb(null, file.originalname[0] + now + "." + imgEnd);
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log("upload : ", upload);
  imgEnd = "";
  console.log("files", req.files);
  res.send(req.files);
  console.log("upload or not", req.files);
});

sequelize
  .sync()
  .then((result) => {
    app.listen(5004);
    console.log("Connected DB !!");
  })
  .catch((err) => {
    console.log("Error connected DB !!", err);
    // logger.log("error", "ERRR " + JSON.stringify(err))
  });

// This creates our socket using the instance of the server
io.on("connection", (socket) => {
  console.log("New client connected");

  // socket.on("change color", (color) => {
  //   console.log("Color Changed to: ", color);
  //   io.sockets.emit("changed_color", color);
  // });

  socket.on("edited vacation", (obj) => {
    // console.log(" vacationsARR: ", vacationsARR);
    io.sockets.emit("after_edit_vacation", obj);
  });

  socket.on("delete vacation", (vacationsARR) => {
    // console.log(" vacationsARR: ", vacationsARR);
    io.sockets.emit("after_delete_vacation", vacationsARR);
  });
  // FIXME: with id not work
  // socket.on("delete with id", (vacationID) => {
  //   // console.log(" vacationsARR: ", vacationsARR);
  //   io.sockets.emit("id to delete", vacationID);
  // });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5003);
