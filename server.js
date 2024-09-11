const mongoose = require("mongoose"); 
const { type } = require("os");

let studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate: {
          validator: function(v) {
            return  /^[a-zA-Z ]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid first Name!`
        },
        required: [true, 'User first Name is required']
      },
    
      lastName: {
        type: String,
        validate: {
          validator: function(v) {
            return  /^[a-zA-Z ]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid last Name!`
        },
        required: [true, 'User last Name is required']
      },
    age:{
        type:Number,
        min:[18,"you are too  young to create Account"],
        max:[120,"you are too old to create Account"],
        require:true,
    },
    gender:{
        type:String,
        require:true,
        lowercase:true,
        enum:["male","female"]
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email id!`
        },
        required: [true, 'User email id is required']
      },
    
      phoneNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return  /^(\+91-?)?[6-9]\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone Number!`
        },
        required: [true, 'User phone Number is required']
      },

})

let Student =new mongoose.model("students",studentSchema);


let saveToDB = async()=>{
    try{
        let veeresh = new Student({
            firstName:"sai",
            lastName:"Achanta",
            age:28,
            gender:"male",
            email:"veeresh@gmail.com",
            phoneNumber:"+91-9966332255",
        });
        // await veeresh.save();
        let suresh = new Student({
            firstName:"suresh",
            lastName:"plisetti",
            age:23,
            gender:"male",
            email:"suresh@gmail.com",
            phoneNumber:"+91-9966332255",
        });
        // await suresh.save();
        let prakash = new Student({
            firstName:"prakash",
            lastName:"Adabala",
            age:28,
            gender:"Male",
            email:"prakash@gmail.com",
            phoneNumber:"+91-9966332255",
        });
        Student.insertMany([veeresh,suresh,prakash])

        console.log("Saved to MDB Successfully");

    }catch(err){
        console.log("Unable toSave")

    }
   

}
let getDataFromDB = async ()=>{
  let studentData = await  Student.find();
  console.log(studentData)
}


let connectToMDB = async()=>{
    try{
       await  mongoose.connect("mongodb+srv://veeresh28:veeresh28@batch2406cluster.xgvnc.mongodb.net/Batch2406Students?retryWrites=true&w=majority&appName=Batch2406cluster");
        console.log("Suuccessfully connected to MDB");
        saveToDB();
        getDataFromDB();

    }catch(err){
        console.log("Unable to connect MDB");
        console.log(err);

    }
   

};

connectToMDB();

