const router = require('express').Router();
const Joi = require('joi');
const dbManager = require('../database/db');

var mockList = [];

// Defines a schema to validate the fields 
const categorySchema = Joi.object({
  name: Joi.string()
    .max(128)
    .required()
});

router.get('/categories', async (req, res) => {
  try {
    let [ rows ] = await dbManager.getCategories();

    if (rows && rows.length > 0)
      res.status(200).send(JSON.stringify(rows));
    else
      res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
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
    await dbManager.insertNewCategory(value);
    res.status(201)
      .setHeader('location', `/categories`)
      .send(JSON.stringify(value));
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await dbManager.deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;