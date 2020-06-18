import { getConnection } from "typeorm";

import { Comment, CommentSort } from "../../models/Comment";

export const resolvers = {
    Query: {
        async popularComments() {
            //TODO 기준을 모르겠음
        },
        async usersCommentCount(root, { userId }) {
            return await Comment.count({
                where: { userId: userId }
            });
        },
        async usersComments(root, { category, userId, page, size }) {
            return await getConnection()
                .getRepository(Comment).createQueryBuilder("comment")
                .innerJoinAndSelect("comment.content", "content")
                .where("comment.sort = 'CONTENT' AND comment.user_id = :userId AND content.category = :category", { userId: userId, category: category })
                .orderBy("comment.id", "DESC")
                .skip(page * size).take(size)
                .getMany();
        },
        async contentsComments(root, { contentId, page, size }) {
            return await Comment.find({
                where: {
                    parentId: contentId,
                    sort: CommentSort.CONTENT
                },
                order: { createdAt: "DESC" },
                skip: page * size,
                take: size
            });
        },
        async collectionsComments(root, { collectionId, page, size }) {
            return await Comment.find({
                where: {
                    parentId: collectionId,
                    sort: CommentSort.COLLECTION
                },
                order: { createdAt: "DESC" },
                skip: page * size,
                take: size
            });
        }
    },
    Mutation: {
        async createComment(root, { input }) {
            var comment = new Comment();
            comment.sort = input.sort;
            comment.parentId = input.parentId;
            comment.parentCommentId = input.parentCommentId;
            comment.userId = input.userId;
            comment.content = input.content;
            comment.isSpoiler = input.isSpoiler;
            return await comment.save();
        },
        async deleteComment(root, { id }) {
            var comment = await Comment.findOne({ id: id });
            return await comment.remove();
        }
    }
}