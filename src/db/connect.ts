import mongoose from "mongoose";

// mongoose.connect return a Promise
// interface ConnectOptions {
//   useNewUrlParser: boolean;
//   useCreateIndex: boolean;
//   useFindAndModify: boolean;
//   useUnifiedTopology: boolean;
// }
//
// const connectOptions: ConnectOptions = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// };

const connectDB = (url: string) => {
  mongoose.connect(url);
};

export default connectDB;
