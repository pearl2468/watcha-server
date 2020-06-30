import { logger } from './middleware';
import { makeGrpahqlHTTP } from './graphql';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from "bcryptjs";

import { User } from "./models/User";

const express = require('express');
const cors = require('cors');
const app = express();

app.post('/login', async function (req, res) {

    var user = await User.findOne({ email: req.query.email });
    if (user == null) {
        return;
    }
    var secretKey = 'secret';
    bcrypt.compare(req.query.password, user.password, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        if (result) {
            const tokenData = {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email
            }
            const result = {
                success: true,
                token: jwt.sign(tokenData, secretKey, {
                    expiresIn: '1d',
                }),
            }
            res.status(200).json(result);
        }
    });
});

app.use(logger);
app.use(cors());

makeGrpahqlHTTP();

export { app }
