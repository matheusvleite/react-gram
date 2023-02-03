import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.set("strictQuery", true);

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.e471wdl.mongodb.net/?retryWrites=true&w=majority`)

export let db = mongoose.connection;
