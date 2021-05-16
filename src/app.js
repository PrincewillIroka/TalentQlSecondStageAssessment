import express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import { initialize } from './models';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use('/api', routes);
app.use('/images', express.static('./uploads/images'));

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, Content, Accept, Content-Type, Authorization, Content-Length, X-Requested-With'
	);
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to TalentQl Assessment!',
	});
});

initialize();

// Create upload folder first if it doesn't exist
(async () => {
	const uploadFolder = path.join(process.cwd(), 'uploads/images');
	if (!fs.existsSync(uploadFolder)) {
		await fs.mkdirSync(uploadFolder);
	}
})();

export default app;
