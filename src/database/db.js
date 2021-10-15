const mysql = require('mysql2/promise');

async function _connect () {
  if (global.connection && global.connection.state !== 'disconnected')
    return  global.connection;

  try {
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD
    });

    global.connection = dbConnection;
    return dbConnection;
  } catch (err) {
    throw err;
  }
}

module.exports.getDevices = async () => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'SELECT `devices`.id, `devices`.categoryId, `devices`.color, `devices`.partNumber, `categories`.name FROM `devices`, `categories` WHERE `devices`.categoryId = `categories`.id';
    return await dbConnection.execute(sqlQuery);
  } catch (err) {
    throw err;
  }
}

module.exports.insertNewDevice = async (value) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'INSERT INTO `devices` (categoryId, color, partNumber) VALUES (?, ?, ?)';
    await dbConnection.execute(sqlQuery, [value.categoryId, value.color, value.partNumber]);
  } catch (err) {
    throw err;
  }
}

module.exports.deleteDevice = async (id) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'DELETE FROM `devices` WHERE id=?';
    await dbConnection.execute(sqlQuery, [id]);
  } catch (err) {
    throw err;
  }
}

module.exports.getCategories = async () => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'SELECT * FROM `categories`';
    return await dbConnection.execute(sqlQuery);
  } catch (err) {
    throw err;
  }
}

module.exports.insertNewCategory = async (value) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'INSERT INTO `categories` (name) VALUES (?)';
    await dbConnection.execute(sqlQuery, [value.name]);
  } catch (err) {
    throw err;
  }
}

module.exports.deleteCategory = async (id) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'DELETE FROM `categories` WHERE id=?';
    await dbConnection.execute(sqlQuery, [id]);
  } catch (err) {
    throw err;
  }
}