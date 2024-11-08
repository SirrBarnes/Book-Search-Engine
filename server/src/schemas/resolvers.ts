import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface AddUserArgs {
    input:{
        username: string;
        email: string;
        password: string;
    }
}

interface LoginUserArgs {
    email: string;
    password: string;
}

interface UserArgs {
    username: string;
}


interface AddBookArgs {
    userId: string;
    input: {
        bookId: string;
        description: string;
        image: string;
        link: string;
        title: string;
    }
}


interface RemoveBookArgs {
    userId: string;
    bookId: string;
}

const resolvers = {
    Query: {
        user: async(_parent: any, { username }: UserArgs) => {
            return User.findOne({ username }).populate('savedBooks');
        },

        me: async(_parent: any, _args: any, context: any) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError("Could not authenticate user");
        },
    },

    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const user = await User.create({ ...input });

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        login: async (_parent: any, {email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        saveBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
            if (context.user) {
                // console.log("I'm here, trying");

                return await User.findOneAndUpdate(
                    { _id: context.user._id }, 
                    { 
                        $addToSet: {
                        savedBooks: input,
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },

        removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: any) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            savedBooks: bookId
                        },
                    },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

export default resolvers;