import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
        user_id : String,
        meeting_code : {
                type : String,
                required : true,
                required:true
        },
        date : {
                type : Date,
                default : Date.now(),
                required:true
        }
});

const Meeting = mongoose.model("Meeting",meetingSchema);
export {Meeting};