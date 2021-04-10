'use strict';

const ExitCode = {
  success: 0,
  error: 1
};

const DEFAULT_COMMAND = `--version`;

const USER_ARGV_INDEX = 2;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

module.exports = {
  ExitCode,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  API_PREFIX,
  MAX_ID_LENGTH,
  HttpCode,
  Env,
};
