import { Like } from "typeorm";

import { User } from '../../models/User';

export const resolvers = {
    Query: {
        async searchUsers(root, { query, page, size }) {
            return await User.find({
                where: { name: Like("%" + query + "%") },
                order: { name: "ASC" },
                skip: page * size,
                take: size
            });
        }
    },
    Mutation: {
        async join(root, { input }) {
            var user = new User();
            user.name = input.name;
            user.email = input.email;
            user.password = input.password;
            user.descr = input.descr;
            user.role = input.role;
            return await user.save();
        },
        async updateUser(root, { id, input }) {
            var user = await User.findOne({ id: id });
            user.name = input.name;
            user.email = input.email;   //TODO 이메일 수정 가능?
            user.descr = input.descr;
            return await user.save();
        },
        async updateUserPassword(root, { id, password }) {
            var user = await User.findOne({ id: id });
            user.password = password;
            return await user.save();
        },
        async deleteUser(root, { id }) {
            var user = await User.findOne({ id: id });
            return await user.remove();
        }
    }
}