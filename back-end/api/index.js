import './patch.js';
import { app } from "../app.js";
// import { connectDB } from "../db.js";
import { connectDB } from "../models/db.js";
const port = process.env.PORT || 3000

try {
  connectDB()
    .then(() => {
      console.log("mongodb initialized")
      if (process.env.NODE_ENV !== "production") {
        app.listen(port, () => console.log(`server running at ${port}`));
      }
    })
} catch (error) {
  console.error("cannot connect to db, check app.js trycach block")
}

export default app;