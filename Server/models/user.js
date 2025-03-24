import mongoose from 'mongoose'
const userSchema=mongoose.Schema({

    name:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:
    {
        type:String,
        required:true,
    }
})

export default mongoose.model('User',userSchema)
// The above code snippet is a model that defines the schema for the user. The schema has three fields: name, email, and password. The model is exported so that it can be used in other files. The model is created using the mongoose package, which is a popular package for working with MongoDB in Node.js.