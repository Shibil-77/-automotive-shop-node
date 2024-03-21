require("dotenv").config();
import mongoose from "mongoose";
import { app } from "./server";

const port: string | undefined = process.env.SERVER_PORT;

module.exports = {
  startServer: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL!);
      console.log("connected to Database");
      app.listen(port, () => console.log("server running on port", port));
    } catch (error) {
      console.log(" Failed to connect the Database");
    }
  },
};
