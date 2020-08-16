const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connection1 = mongoose.createConnection(
    'mongodb+srv://Davidson:p8L8qu5sgmS$9VH@cluster0-dpfwx.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true})

const connection2 = mongoose.createConnection('mongodb://localhost/pomodoro', {useNewUrlParser: true})

const MyModel = connection2
.model('pomodoro', new mongoose.Schema({}));
const MyModel2 = connection1
.model('Pomodoro', new mongoose.Schema({data: Array, day: String, user_id: String}));

MyModel.find().then(
    res=>{
        console.log(res)
        res.forEach((one)=>{
        let data=one.toJSON()
        delete data._id
        delete data.__v
        console.log(data)

        MyModel2.create({...data})
        // .then(res=>{console.log(res); mongoose.disconnect()})
        // .catch(err=>console.log(err)
    })})
    .catch(err=>{console.log(err); })

// 5f3863fc2a0da57857fc540a


