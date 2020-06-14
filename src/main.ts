import { app } from './app';
import * as http from 'http';

import { databaseConn } from './database';

const PORT = 8080;
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async () => {
	await databaseConn();
	console.info(`Listening on port ${PORT}`);
});