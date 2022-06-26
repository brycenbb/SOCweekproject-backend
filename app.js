import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.listen(PORT);

app.use('/', router);

app.get('/users/:id', (req, res) => {
  //payload will be query on all of the notes of the user based on req.params.id
  //pool.query('Select * from notes join profile on notes.userID=profile.userID')
  res.json({ sucess: true, payload: 'you wish' });
});

export default app;
