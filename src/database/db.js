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
    const sqlQuery = 'SELECT `Devices`.id, `Devices`.category, `Devices`.color, `Devices`.partNumber, `Categories`.name FROM `Devices`, `Categories` WHERE `Devices`.category = `Categories`.id';
    return await dbConnection.execute(sqlQuery);
  } catch (err) {
    throw err;
  }
}

module.exports.insertNewDevice = async (value) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'INSERT INTO `Devices` (category, color, partNumber) VALUES (?, ?, ?)';
    await dbConnection.execute(sqlQuery, [value.category, value.color, value.partNumber]);
  } catch (err) {
    throw err;
  }
}

module.exports.deleteDevice = async (id) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'DELETE FROM `Devices` WHERE id=?';
    await dbConnection.execute(sqlQuery, [id]);
  } catch (err) {
    throw err;
  }
}

module.exports.getCategories = async () => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'SELECT * FROM `Categories`';
    return await dbConnection.execute(sqlQuery);
  } catch (err) {
    throw err;
  }
}

module.exports.insertNewCategory = async (value) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'INSERT INTO `Categories` (name) VALUES (?)';
    await dbConnection.execute(sqlQuery, [value.name]);
  } catch (err) {
    throw err;
  }
}

module.exports.deleteCategory = async (id) => {
  try {
    const dbConnection = await _connect();
    const sqlQuery = 'DELETE FROM `Categories` WHERE id=?';
    await dbConnection.execute(sqlQuery, [id]);
  } catch (err) {
    throw err;
  }
}