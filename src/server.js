import http from 'http';
import app from './app';

const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (typeof port !== 'number') {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

const port = normalizePort(process.env.PORT || 4000);

app.set('port', port);

const server = http.createServer(app);

const errorHandler = (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges.`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use.`);
			process.exit(1);
			break;
		default:
			throw error;
	}
};

server.on('error', errorHandler);
server.on('listening', async () => {
	const address = server.address();
	const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
	console.log(`Listening on ${bind}`);
});

server.listen(port);
