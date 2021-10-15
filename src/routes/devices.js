const router = require('express').Router();
const Joi = require('joi');
const dbManager = require('../database/db');

// Defines a schema to validate the fields 
const deviceSchema = Joi.object({
  categoryId: Joi.number()
    .min(1)
    .required(),
  color: Joi.string()
    .max(16)
    .pattern(new RegExp('^[A-Za-z]+$'))
    .required(),
  partNumber: Joi.number()
    .min(1)
    .required()
});

router.get('/devices', async (req, res) => {
  try {
    let [ rows ] = await dbManager.getDevices();

    if (rows && rows.length > 0)
      res.status(200).send(JSON.stringify(rows));
    else
      res.status(204).send();

  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

router.post('/devices', async (req, res) => {
  const { error, value } = deviceSchema.validate(req.body);
  console.log(value)

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
    await dbManager.insertNewDevice(value);
    res.status(201)
      .send(JSON.stringify(value));
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

router.delete('/devices', async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  try {
    await dbManager.deleteDevice(id);
    res.setHeader('location', `/devices`)
      .status(204)
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;