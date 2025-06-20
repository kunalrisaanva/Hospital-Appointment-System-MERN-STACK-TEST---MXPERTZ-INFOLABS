import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
import { app } from "./app.js";


dotenv.config({
  path: "./.env",
});

// Database connection

connectDB()
.then(() => {
  // Start the Express server


  app.listen(process.env.PORT || 4000, () => {
    console.log(`\n ⚙️ Server is running on ${process.env.PORT || 4000} And PID ${process.pid} ⚙️`);
  });

  app.on('error', (err) => {
    // Handle uncaught exceptions or errors here
    console.error('An error occurred:', err);
  });
})
.catch((error) => {
  console.log("MONGODB CONNECTION FAILED !! :", error);
});








