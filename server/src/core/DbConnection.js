import mongoose from 'mongoose';
import config from '../config/Index';
/*Connection of mongoDb*/
export const connect = () => {
  return mongoose.connect(config.dbDetails.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    () => {
      console.log("MongoDb Connected Successfully");
      return true;
    },
    err => {
      console.log("Errr is", err);
      return false;
    }
  );
};

/*Close connection of MongoDb*/
const close = function () {
  if (process.env.NODE_ENV === 'test') {
    return mongoose.connection.db.dropDatabase();
  } else {
    return mongoose.disconnect();
  }
};



