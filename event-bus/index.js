const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;

  events.push(event);

  await axios.post('http://posts-cluster-srv:4000/events', event);
  // await axios.post('http://localhost:4001/events', event);
  // await axios.post('http://localhost:4002/events', event);
  // await axios.post('http://localhost:4003/events', event);

  res.send({ status: 'Ok' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () =>
  console.log('Event Bus --> Survise listing on PORT --> 4005')
);
