const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})

const MyModel = mongoose.model('tabledatas', new mongoose.Schema({ name: String }));

MyModel.find().then(
    res=>{
        console.log(res)
        res.forEach((one)=>{
        console.log(one.toJSON())
        // MyModel.where({day: one.toJSON().day}).update({...one.toJSON(), user_id: '5f3863fc2a0da57857fc540a'})
        // .then(res=>{console.log(res); mongoose.disconnect()})
        // .catch(err=>console.log(err))
        mongoose.disconnect()
    })})
    .catch(err=>{console.log(err); mongoose.disconnect()})

// 5f3863fc2a0da57857fc540a


