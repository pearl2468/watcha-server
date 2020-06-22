import { getConnection } from "typeorm";

import { Comment } from "../../models/Comment";

export const resolvers = {
    Query: {
        async popularComments() {
            //TODO 기준을 모르겠음
        },
        async usersCommentCount(root, { userId }) {
            return await Comment.count({
                where: { userId: userId }
                , relations: ["content"]
            });
        },
        async usersComments(root, { category, userId, page, size }) {
            return await getConnection()
                .getRepository(Comment).createQueryBuilder("comment")
                .innerJoinAndSelect("comment.content", "content", "content.category = :category", { category: category })
                .where("comment.user_id = :userId", { userId: userId })
                .orderBy("comment.id", "DESC")
                .skip(page * size).take(size)
                .getMany();
        },
        async contentsComments(root, { contentId, page, size }) {
            return await Comment.find({
                where: { contentId: contentId },
                relations: ["content"],
                order: { createdAt: "DESC" },
                skip: page * size,
                take: size
            });
        },
        async collectionsComments(root, { collectionId, page, size }) {
            return await Comment.find({
                where: { collectionId: collectionId },
                order: { createdAt: "DESC" },
                skip: page * size,
                take: size
            });
        }
    },
    Mutation: {
        async createComment(root, { input }) {
            var comment = new Comment();
            if (input.contentId != null)
                comment.contentId = input.contentId;
            if (input.collectionId != null)
                comment.collectionId = input.collectionId;
            comment.parentCommentId = input.parentCommentId;
            comment.userId = input.userId;
            comment.text = input.text;
            comment.isSpoiler = input.isSpoiler;
            return await comment.save();
        },
        async deleteComment(root, { id }) {
            var comment = await Comment.findOne({ id: id });
            return await comment.remove();
        }
    }
}