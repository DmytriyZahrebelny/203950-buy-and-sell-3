'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

const {getAPI} = require(`../api`);

const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  try {
    const offers = await api.getOffers();

    res.render(`my-tickets`, {offers: offers.slice(0, 3)});
  } catch (error) {
    res.render(`my-tickets`, {offers: []});
  }
});

myRouter.get(`/comments`, async (req, res) => {
  try {
    const offers = await api.getOffers();

    res.render(`comments`, {offers: offers.slice(0, 3)});
  } catch (error) {
    res.render(`comments`, {offers: []});
  }
});

module.exports = myRouter;
