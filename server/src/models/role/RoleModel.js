import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({

    roleName: {
        type: String,
        required: true,
    }

});

export default mongoose.model('role', RoleSchema);
