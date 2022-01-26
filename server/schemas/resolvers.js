const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address!');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Password Incorrect!')
            }

            const token = signToken(user);

            return { token, user }
        },
        saveBook: async (parent, { bookId }, context) => {
            if (context.user) {
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookId } },
                    {new: true, runValidators: true, }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            savedBooks: {
                                bookId: bookId
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}
