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
    }
});

export default model('Product', ProductSchema)