import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    category: {
        type: String,
        enum: ['business', 'personal', 'group'],
        required: 'Enter a category'
    },
    // Personal
    email: {
        type: String
    },
    // Business
    address: {
        type: String
    },
    phone: {
        type: String
    },
    // Group
    size: {
        type: Number
    }
});

export default model('Product', ProductSchema)