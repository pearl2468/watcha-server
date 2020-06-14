import { getConnection } from "typeorm";

import { Watch } from '../../models/Watch';

export const resolvers = {
    Query: {
        async watchs(root, { category, status, userId, page, size }) {
            return await getConnection()
                .getRepository(Watch).createQueryBuilder("watch")
                .innerJoinAndSelect("watch.content", "content", "content.category = :category", { category: category })
                .where("watch.status = :status AND watch.user_id = :userId", { status: status, userId: userId })
                .skip(page * size).take(size)
                .getMany();
        }
    },
    Mutation: {
        async saveWatch(root, { input }) {
            var watch = new Watch();
            watch.id = input.id;
            watch.contentId = input.contentId;
            watch.userId = input.userId;
            watch.status = input.status;
            return await watch.save();
        },
        async deleteWatch(root, { id }) {
            var watch = await Watch.findOne({ id: id });
            return await watch.remove();
        }
    }
}