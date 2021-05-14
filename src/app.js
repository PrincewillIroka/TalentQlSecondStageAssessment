import express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import routes from './routes';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use('/api', routes);

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
		message: 'Welcome to TalentQlSecondStageAssessment!',
	});
});

export default app;
