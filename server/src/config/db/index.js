const mongoose = require('mongoose');

function connect()
{
    try{

        mongoose.connect('mongodb://localhost:27017/app-mang-xa-hoi', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:true,
        });
        console.log('connect success fully')
    }catch(err)
    {
        console.log('ket noi that bai!!!')
    }
}

module.exports={connect}