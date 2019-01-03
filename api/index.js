const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({ path: '.env.development.local' });

const neighborhoodJson = require('./res/neighborhood.json');
const eventJson = require('./res/event.json');

const { API_PORT } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

const getTimeProperties = data => {
  const now = new Date();
  return {
    created_at: now,
    modified_at: now,
    ...data
  };
};

router
  .route('/event')
  .get((req, res) => res.json(eventJson))
  .post((req, res) => {
    const newEvent = getTimeProperties({
      // eslint-disable-next-line no-plusplus
      id: ++eventJson.count,
      state: 'waiting_for_approval',
      ...req.body
    });
    eventJson.results.push(newEvent);

    res.json(newEvent);
  });

router.get('/neighborhood', (req, res) => res.json(neighborhoodJson));

app.use('/v1', router);
app.listen(API_PORT, () => console.log(`API running on port ${API_PORT}!`));
