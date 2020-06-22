import { getConnection } from "typeorm";

import { Rate } from "../../models/Rate";

export const resolvers = {
    Query: {
        async ratedContentCount(root, { category, userId }) {
            return await getConnection()
                .getRepository(Rate).createQueryBuilder("rate")
                .innerJoinAndSelect("rate.content", "content")
                .where("rate.user_id = :userId AND content.category = :category", { userId: userId, category: category })
                .getCount();
        },
        async ratedContents(root, { category, userId, page, size }) {
            return await getConnection()
                .getRepository(Rate).createQueryBuilder("rate")
                .innerJoinAndSelect("rate.content", "content")
                .where("rate.user_id = :userId AND content.category = :category", { userId: userId, category: category })
                .orderBy("rate.id", "DESC")
                .skip(page * size).take(size)
                .getMany();
        },
        async ratedContentsByScore(root, { category, score, userId, page, size }) {
            return await getConnection()
                .getRepository(Rate).createQueryBuilder("rate")
                .innerJoinAndSelect("rate.content", "content")
                .where("rate.user_id = :userId AND content.category = :category AND rate.score = :score", { userId: userId, category: category, score: score })
                .orderBy("rate.id", "DESC")
                .skip(page * size).take(size)
                .getMany();
        },
        async mostRatedScore(root, { userId }) {
            //TODO
            // SELECT SCORE, COUNT(ID) FROM RATE GROUP BY SCORE
        },
    },
    Mutation: {
        async saveRate(root, { input }) {
            var rates = await Rate.find({ userId: input.userId, contentId: input.contentId });
            await rates.forEach(rate => {
                rate.remove();
            });

            var newRate = new Rate();
            newRate.contentId = input.contentId;
            newRate.userId = input.userId;
            newRate.score = input.score;
            return await newRate.save();
        },
        async deleteRate(root, { id }) {
            var rate = await Rate.findOne({ id: id });
            return await rate.remove();
        }
    }
}