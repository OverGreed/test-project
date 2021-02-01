import * as express from 'express';
import * as bodyParser from 'body-parser';
import { auth } from './services';
import { authRoute, communityRoute, postRoute, userRoute, feedRoute } from './routes';

const app = express();

app.use(bodyParser.json());
app.use(auth.setUser);
const port = parseInt(process.env.PORT || '3000', 10);

app.get('/status', (req, res) => {
    res.send(JSON.stringify(process.env, null, 2));
});

app.use('/auth', authRoute);
app.use('/community', communityRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/feed', feedRoute);

app.listen(port, '0.0.0.0', () => {
    console.log(`Start application on port ${port}!`);
});
