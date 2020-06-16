import { Like, getConnection } from "typeorm";

import { Content, Category } from '../../models/Content';
import { Role } from "../../models/User";

export const resolvers = {
    Query: {
        async searchContents(root, { category, query, page, size }) {
            return await Content.find({
                where: [
                    { category: category, title: Like("%" + query + "%") },
                    { category: category, id: Like("%" + query + "%") }
                ],
                order: { title: "ASC" }, // TODO 
                skip: page * size,
                take: size
            });
        },
        async randomContents(root, { category, size }) {
            return await getConnection()
                .getRepository(Content).createQueryBuilder("content")
                .where("content.category = :category", { category: category })
                .orderBy("RAND()")
                .limit(size)
                .getMany();
        },
        async topScoredMovies(root, { page, size }) {
            return await Content.find({
                where: { category: Role.ADMIN },
                order: { score: "DESC" },
                skip: page * size,
                take: size
            });
        },
        async mostRatedBooks(root, { page, size }) {
            return await Content.find({
                where: { category: Category.BOOK },
                order: { rateCount: "DESC" },
                skip: page * size,
                take: size
            });
        },

        async bestContents() { },
        async mostRatedContents() { },
        async ratedContents() { }
    },
    Mutation: {
        async createContent(root, { input }) {
            var content = new Content();
            content.title = input.title;
            content.category = input.category;
            content.attr = input.attr;
            return await content.save();
        },
        async updateContent(root, { id, input }) {
            var content = await Content.findOne({ id: id });
            content.title = input.title;
            content.category = input.category;
            content.attr = input.attr;
            return await content.save();
        },
        async deleteContent(root, { id }) {
            var content = await Content.findOne({ id: id });
            return await content.remove();
        }
    }
}