const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Db Connected!');
    } catch (error) {
        console.log(error);
        throw new Error('Connection error');
    }


}

module.exports = {
    dbConnection
}