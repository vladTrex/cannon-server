import Product from './models/Product';

const ME = {
    _id: 1019,
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

const delay = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
});

export const resolvers = {
    AllowedCategories: {
        BUSINESS: 'business',
        PERSONAL: 'personal',
        GROUP: 'group'
    },
    Query: {
        products: async () => {
            return await Product.find({});
        },

        product: async (root, args) => {
            const {id} = args;
            return await Product.findOne({_id: id});
        },

        me: async () => {
            await delay(1000)
            return ME;
        }
    },
    Mutation: {
        addProduct: async (root, args) => {
            const newProduct = new Product(args);

            return await newProduct.save();
        },
        updateProduct: async (_, args) => {
            const {productId, input} = args;
            const res = await Product.findOneAndUpdate({_id: productId}, input, {
                new: true,
                upsert: true,
                rawResult: true
            });
            return res.value;
        },
        removeProduct: async (_, args) => {
            const {productId} = args;

            await Product.findOneAndDelete({_id: productId});

            return {success: true};
        },
        updateMe: (_, args) => {
            const { bio } = args;
            ME.bio = bio;
            return ME;
        }
    }
};