import { Collection } from "models/Collection";

export const resolvers = {
    Query: {
        async popularCollections() {
            //TODO 기준을 모르겠음
        },
        async usersCollectionCount(root, { userId }) {
            return await Collection.count({
                where: { userId: userId }
            });
        },
        async usersCollections(root, { userId, page, size }) {
            return await Collection.find({
                where: { userId: userId },
                order: { createdAt: "DESC" },
                skip: page * size,
                take: size
            });
        },
        async contentsCollections(root, { contentId, page, size }) {
        },
    },
    Mutation: {
        async createCollection(root, { input }) {
            var collection = new Collection();
            collection.userId = input.userId;
            collection.title = input.title;
            collection.descr = input.descr;
            return await collection.save();
        },
        async deleteCollection(root, { id }) {
            var collection = await Collection.findOne({ id: id });
            return await collection.remove();
        }
    }
}