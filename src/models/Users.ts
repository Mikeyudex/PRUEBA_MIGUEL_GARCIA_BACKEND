import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    username: String,
    active: {
        type: Boolean,
        default: false
    },
    token: String
});

export default mongoose.model('users', UserSchema);