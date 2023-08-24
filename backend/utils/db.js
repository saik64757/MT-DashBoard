const { default: mongoose } = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to dataBase succesfully");
  } catch (error) {
    console.log("Could not connect to dataBase");
  }
};
