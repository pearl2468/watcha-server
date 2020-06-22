import { IsNull, Not } from "typeorm";

import { Heart } from "../../models/Heart";

export const resolvers = {
    Query: {
        async heartedCount(root, { userId }) {
            return await Heart.count({
                where: { userId: userId }
            });
        },
        async heartedCollections(root, { userId, page, size }) {
            return await Heart.find({
                where: { userId: userId, collectionId: Not(IsNull()) },
                order: { createdAt: "ASC" },
                skip: page * size,
                take: size
            });
        },
        async heartedComments(root, { userId, page, size }) {
            return await Heart.find({
                where: { userId: userId, commentId: Not(IsNull()) },
                order: { createdAt: "ASC" },
                skip: page * size,
                take: size
            });
        }
    },
    Mutation: {
        async saveHeart(root, { input }) {
            var hearts = [];
            var newHeart = new Heart();

            if (input.commentId != null) {
                hearts = await Heart.find({ userId: input.userId, commentId: input.commentId });
                newHeart.commentId = input.commentId;
            }
            if (input.collectionId != null) {
                hearts = await Heart.find({ userId: input.userId, collectionId: input.collectionId });
                newHeart.collectionId = input.collectionId;
            }

            await hearts.forEach(heart => {
                heart.remove();
            });

            newHeart.userId = input.userId;
            return await newHeart.save();
        },
        async deleteHeart(root, { id }) {
            var heart = await Heart.findOne({ id: id });
            return await heart.remove();
        }
    }
}