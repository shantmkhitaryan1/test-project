import mongoose from "mongoose";

const { DB_URI } = process.env;

const connect = () => {
  mongoose
    .connect(DB_URI, {})
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
};

export default connect;