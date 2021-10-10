const router = require('express').Router();
const Joi = require('joi');

var mockList = [];

// Defines a schema to validate the fields 
const categorySchema = Joi.object({
  name: Joi.string()
    .max(128)
    .required()
});

router.get('/categories', (req, res) => {
  res.send('get categories');
});

router.post('/categories', async (req, res) => {
  const { error, value } = categorySchema.validate(req.body);

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