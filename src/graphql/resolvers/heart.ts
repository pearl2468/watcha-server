import { Heart, HeartSort } from "../../models/Heart";

export const resolvers = {
    Query: {
        async heartedCount(root, { userId }) {
            return await Heart.count({
                where: { userId: userId }
            });
        },
        async heartedCollections(root, { userId, page, size }) {
            return await Heart.find({
                where: { userId: userId, sort: HeartSort.COLLECTION },
                order: { createdAt: "ASC" },
                skip: page * size,
                take: size
            });
        },
        async heartedComments(root, { userId, page, size }) {
            return await Heart.find({
                where: { userId: userId, sort: HeartSort.COMMENT },
                order: { createdAt: "ASC" },
                skip: page * size,
                take: size
            });
        }
    },
    Mutation: {
        async saveHeart(root, { input }) {
            var heart = new Heart();
            heart.sort = input.sort;
            heart.parentId = input.parentId;
            heart.userId = input.userId;
            return await heart.save();
        },
        async deleteHeart(root, { id }) {
            var heart = await Heart.findOne({ id: id });
            return await heart.remove();
        }
    }
}