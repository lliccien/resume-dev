import express from "express";
import payload from "payload";
import { mediaManagement } from "payload-cloudinary-plugin";

require("dotenv").config();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, PORT } =
  process.env;

const app = express();

app.use(
  mediaManagement(
    {
      cloud_name: CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    },
    {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder: "resume-dev",
    }
  )
);

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(PORT, () => {
    payload.logger.info(`Server is running on  http://localhost:${PORT}`);
  });
};

start();
