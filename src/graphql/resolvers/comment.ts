import { Comment } from "../../models/Comment";

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
        async usersComments(root, { userId }) {
            return await Comment.find({
                where: { userId: userId },
                order: { updatedAt: "DESC" }
            });
        },
        async heartedComments() { },
        async contentsComments() { }
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