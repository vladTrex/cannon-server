import {ForbiddenError} from 'apollo-server-express';

const ME = {
    _id: 1019,
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };
  
  const delay = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  
  export default {
    Query: {
      me: async (_, args, context) => {
        const { clientId } = context;

        if(clientId !== ME._id) return new ForbiddenError('Forbidden resource');
        await delay(1000);
        return ME;
      }
    },
    Mutation: {
      updateMe: (_, args) => {
        const { bio } = args;
        ME.bio = bio;
        return ME;
      },
    },
  };