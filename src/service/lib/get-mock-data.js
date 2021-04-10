'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
const {getLogger} = require(`../lib/logger`);

let data = null;
const logger = getLogger({name: `mock`});

module.exports = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};


