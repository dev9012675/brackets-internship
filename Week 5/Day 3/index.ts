import { Schema , model , connect , disconnect } from "mongoose";
import * as dotenv from 'dotenv';
import { seedData } from "./data";
dotenv.config()

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    joinDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' } ,
    tags:[String]
})

const User = model('User', userSchema);

const main = async ()=> {
    if(typeof process.env.MONGO_STRING === `undefined` || process.env.MONGO_STRING === ``)
    {
        console.log(`Connection string is not defined`)
        return
    }
    await connect(process.env.MONGO_STRING)
    await User.insertMany(seedData)
    .then(()=> {
        console.log(`Data inserted successfully`)
    })
    .catch((err)=> {
        console.log(err)

    })

    await disconnect()
    console.log(`Disconnected from database`)

}


 main()