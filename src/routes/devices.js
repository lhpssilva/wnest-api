const router = require('express').Router();
const Joi = require('joi');

var mockList = [];

// Defines a schema to validate the fields 
const deviceSchema = Joi.object({
  category: Joi.number()
    .min(1)
    .required(),
  color: Joi.string()
    .max(16)
    .pattern(new RegExp('^[A-Za-z]+$'))
    .required(),
  partNumber: Joi.number()
    .min(0)
    .required()
});

router.get('/devices', (req, res) => {
  res.status(200).send(JSON.stringify(mockList));
});

router.post('/devices', async (req, res) => {
  const { error, value } = deviceSchema.validate(req.body);

  if (error) {
    res.status(400).send(JSON.stringify({
      success: false,
      statusCode: 400,
      error: {
        reason: error.details[0].message
      }
    }));
  }

  try {
    await insertIntoDatabase(value);
    res.status(200).send(JSON.stringify(value));
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

async function insertIntoDatabase(value) {
  return new Promise((resolve, reject) => {
    mockList.push(value);
    resolve();
  });
}

module.exports = router;