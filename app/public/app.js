"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
//get data
app.get("/", (req, res) => {
  return res.status(200).json({
    sucess: true,
    data: "Live Synced on Sun 10 Sep",
  });
});
//catch all routes
app.use("*", (req, res) => {
  return res.status(400).send("Invalid routes, please try later");
});
//listen for incomming requests
app.listen(PORT, () => {
  console.log("Server running");
});
