import { logger } from './middleware';
import { makeGrpahqlHTTP } from './graphql';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(logger);
app.use(cors());

makeGrpahqlHTTP();

export { app }
