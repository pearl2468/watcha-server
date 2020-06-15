import { getConnection } from "typeorm";

import { Watch } from '../../models/Watch';

export const resolvers = {
    Query: {
        async watchContents(root, { category, status, userId, page, size }) {
            return await getConnection()
                .getRepository(Watch).createQueryBuilder("watch")
                .innerJoinAndSelect("watch.content", "content", "content.category = :category", { category: category })
                .where("watch.status = :status AND watch.user_id = :userId", { status: status, userId: userId })
                .skip(page * size).take(size)
                .getMany();
        },
        async notInterestedContents(root, { userId, page, size }) {
            return await getConnection()
                .getRepository(Watch).createQueryBuilder("watch")
                .innerJoinAndSelect("watch.content", "content")
                .where("watch.status = 'NONE' AND watch.user_id = :userId", { userId: userId })
                .skip(page * size).take(size)
                .getMany();
        }
    },
    Mutation: {
        async saveWatch(root, { userId, contentId, status }) {
            var watchs = await Watch.find({ userId: userId, contentId: contentId });
            await watchs.forEach(watch => {
                watch.remove();
            });

            var newWatch = new Watch();
            newWatch.contentId = contentId;
            newWatch.userId = userId;
            newWatch.status = status;
            return await newWatch.save();
        },
        async deleteWatch(root, { userId, contentId }) {
            var watchs = await Watch.find({ userId: userId, contentId: contentId });
            await watchs.forEach(watch => {
                watch.remove();
            });
        }
    }
}