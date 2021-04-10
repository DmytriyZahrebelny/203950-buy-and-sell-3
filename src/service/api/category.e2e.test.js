'use strict';
const express = require(`express`);
const request = require(`supertest`);

const {mockOffers} = require(`../../mocks`);
const category = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const app = express();
app.use(express.json());
category(app, new DataService(mockOffers));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "Журналы", "Цветы", "Животные"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Цветы`, `Животные`, `Книги`, `Разное`])
      )
  );
});
