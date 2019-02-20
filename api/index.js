const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({ path: '.env.development.local' });

const neighborhoodJson = require('./res/neighborhood.json');
const eventJson = require('./res/event.json');
const geoAddressJson = require('./res/geo_address.json');
const { toInt, findById, findByNotId, getStatus } = require('./utils.js');

const yearlyReports = {
  /* eslint-disable */
  2019: require('./res/reports/2019.json'),
  2018: require('./res/reports/2018.json'),
  2017: require('./res/reports/2017.json')
  /* eslint-enable */
};

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

const findEventById = id => eventJson.results.find(findById(id));
const modifyEventById = (id, event) => {
  const key = eventJson.results.findIndex(findById(id));
  if (key > -1) {
    eventJson.results[key] = { id: toInt(id), ...event };
    return eventJson.results[key];
  }
  return null;
};

const deleteEventById = id => {
  const results = eventJson.results.filter(findByNotId(id));

  if (results.length === eventJson.count) {
    return null;
  }

  eventJson.count = results.length;
  eventJson.results = results;

  return true;
};

router
  .route('/event/:id')
  .get((req, res) => {
    const event = findEventById(req.params.id);
    return res.status(getStatus(event)).json(event);
  })
  .put((req, res) => {
    const modifiedEvent = modifyEventById(req.params.id, req.body);
    return res.status(getStatus(modifiedEvent)).json(modifiedEvent);
  })
  .patch((req, res) => {
    const originalEvent = findEventById(req.params.id);
    const modifiedEvent = modifyEventById(req.params.id, {
      ...originalEvent,
      ...req.body
    });
    return res.status(getStatus(modifiedEvent)).json(modifiedEvent);
  })
  .delete((req, res) => {
    const success = deleteEventById(req.params.id);
    return res.status(getStatus(success)).json(success);
  });

router
  .route('/event')
  .get((req, res) => res.json(eventJson))
  .post((req, res) => {
    const newEvent = getTimeProperties({
      ...req.body,
      // eslint-disable-next-line no-plusplus
      id: ++eventJson.count,
      state: 'waiting_for_approval'
    });
    eventJson.results.push(newEvent);

    res.json(newEvent);
  });

router.route('/contract_zone').get((req, res) => {
  const responseData = yearlyReports[req.query.stats_year];
  res.status(getStatus(responseData)).json(responseData);
});

router.route('/geo_query').get((req, res) => {
  res.json(geoAddressJson);
});

router.get('/neighborhood', (req, res) => res.json(neighborhoodJson));

app.use('/v1', router);
app.listen(API_PORT, () => console.log(`API running on port ${API_PORT}!`));
