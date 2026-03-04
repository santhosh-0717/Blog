import './patch.js';
import { app } from "../app.js";
import { connectDB } from "../models/db.js";

const port = process.env.PORT || 8080;

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");

    if (process.env.NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    }
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

export default app;