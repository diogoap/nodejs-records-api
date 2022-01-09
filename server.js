const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const port = process.env.PORT || 5000;

// MongoDB connection
connectDatabase().catch((err) => console.log(err));
async function connectDatabase() {
  const databaseUrl = process.env.MONGO_URI;
  await mongoose.connect(databaseUrl);
  console.log("MongoDB connected");
}

// Starting sever
routes.listen(port, () => console.log(`App listening on port ${port}`));
