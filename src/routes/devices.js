const router = require('express').Router();
const Joi = require('joi');
const dbManager = require('../database/db');

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
      .setHeader('location', `/devices`)
      .send(JSON.stringify(value));
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

router.delete('/devices/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await dbManager.deleteDevice(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;