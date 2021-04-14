'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();

    return res.status(HttpCode.OK)
      .json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
        .json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.get(`/:offerId/comments`, (req, res) => {
    const {offerId} = req.params;
    const comments = commentService.findAll(offerId);

    if (!comments) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.post(`/:offerId/comments`, commentValidator, (req, res) => {
    const {offerId} = req.params;
    const comments = commentService.create(offerId, req.body);

    if (!comments) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    res.status(HttpCode.CREATED)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, (req, res) => {
    const {offerId, commentId} = req.params;
    const comment = commentService.drop(offerId, commentId);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(comment);
  });
};
