import mongoose from 'mongoose';

/*Connection of mongoDb*/
const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      mongoDBURI = 'mongodb://34.136.106.63:27017/appoitment_management';
    }
    connection()
      .then((connectionObj) => {
        console.log(`Connected to ${mongoDBURI}...`);
        return resolve(connectionObj);
      })
      .catch(err => {
        return reject(err);
      });

  });
};

/*Close connection of MongoDb*/
const close = function () {
  if (process.env.NODE_ENV === 'test') {
    return mongoose.connection.db.dropDatabase();
  } else {
    return mongoose.disconnect();
  }
};

const connection = (mongoURI) => {
  const mongooseConnection = mongoose.connection;
  mongooseConnection.on('error', function (err) {
    console.error(err.message);
  });
  mongooseConnection.on('reconnectFailed', function (err) {
    console.error('Mongoose connection reconnectFailed error: ' + err.message);
  });
  mongooseConnection.on('reconnected', function () {
    console.log('Mongoose default connection reconnected');
  });
  /*mongooseConnection.on('disconnected',function () {
    Logger.log('Mongoose default connection disconnected');
  });*/
  return mongoose
    .connect(mongoURI ? mongoURI : 'mongodb://34.136.106.63:27017/appoitment_management', mongo.mongo.options);
};

export default {
  connect, close
};


