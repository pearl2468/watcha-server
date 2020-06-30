import { app } from './app';
import { databaseConn } from './database';
import * as http from 'http';

const PORT = 8080;
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async () => {
	await databaseConn();
	console.info(`Listening on port ${PORT}`);
});