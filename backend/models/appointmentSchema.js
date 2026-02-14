import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
  userData: {
  name: String,
  email: String,
  image: String,
  phone: String,
  address: {
    line1: String,
    line2: String,
  },
  gender: String,
  dob: String,
},
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  userData:{type:Object,required:true},
  docData:{type:Object,required:true},
  slotDate: {
    type: String,
    required: true
  },
  slotTime: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  cancelled:{type:Boolean,default:false},
  payment:{type:Boolean,default:false},
  isCompleted:{type:Boolean,default:false}
});

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment',appointmentSchema);

export default appointmentModel;