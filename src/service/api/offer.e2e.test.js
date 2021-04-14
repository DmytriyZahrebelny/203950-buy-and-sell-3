'use strict';
const express = require(`express`);
const request = require(`supertest`);

const {
  mockOffers,
  mockFirstOffersId,
  mockSecondOfferId,
  mockSecondOfferTitle,
  mockNoExistId,
  mockNotFound,
  mockInvalidOffer,
  mockOfferCommentId,
  mockNewOffer,
} = require(`../../mocks`);
const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const createAPI = () => {
  const app = express();
  app.use(express.json());
  offer(app, new DataService(mockOffers), new CommentService(mockOffers));
  return app;
};

describe(`API /offers GET`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Should return correct count of offers`, () => {
    expect(response.body.length).toBe(mockOffers.length);
  });
  test(`First offer's id should be correct`, () => {
    expect(response.body[0].id).toBe(mockFirstOffersId);
  });
});

describe(`API /offers/:offerId GET`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/${mockSecondOfferId}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Offer's title should be correct`, () => expect(response.body.title).toBe(mockSecondOfferTitle));
  test(`API returns status code 404 when trying to pass invalid Id`, () => {
    return request(app)
      .get(`/offers/${mockNoExistId}`)
      .send(mockNotFound)
      .expect(HttpCode.NOT_FOUND);
  });
});

describe(`API /offers POST`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(mockNewOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(mockNewOffer)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(mockOffers.length))
  );

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(mockNewOffer)) {
      const badOffer = {...mockNewOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API /offers/:offerId PUT`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/${mockFirstOffersId}`)
      .send(mockNewOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(mockNewOffer)));
  test(`Offer is really changed`, () => request(app)
    .get(`/offers/${mockFirstOffersId}`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

  test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
    return request(app)
      .put(`/offers/${mockSecondOfferId}`)
      .send(mockInvalidOffer)
      .expect(HttpCode.BAD_REQUEST);
  });

  test(`API returns status code 404 when trying to change non-existent offer`, () => {
    return request(app).put(`/offers/${mockNoExistId}`).send(mockNewOffer).expect(HttpCode.NOT_FOUND);
  });
});

describe(`API /offers/:offerId DELETE`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/${mockFirstOffersId}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted offer`, () => expect(response.body.id).toBe(mockFirstOffersId));
  test(`List of offers should`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(2))
  );

  test(`API refuses to delete non-existent offer`, () => {
    return request(app)
      .delete(`/offers/${mockNoExistId}`)
      .expect(HttpCode.NOT_FOUND);
  });
});

describe(`API /offers/:offerId/comments GET`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/${mockSecondOfferId}/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Count of offer should be correct`, () => expect(response.body.length).toBe(mockOffers[1].comments.length));
  test(`API returns status code 404 when trying to pass invalid Id`, () => {
    return request(app)
      .get(`/offers/${mockNotFound}/comments`)
      .send(mockNotFound)
      .expect(HttpCode.NOT_FOUND);
  });
});

describe(`API /offers/:offerId/comments POST`, () => {
  const newComment = {
    text: `Новый комментарий`,
  };
  const invalidComment = `invalid comment`;
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/${mockFirstOffersId}/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`API refuses to create a comment to non-existent offer and returns status code 400`, () => {
    return request(app)
      .post(`/offers/${mockFirstOffersId}/comments`)
      .send(invalidComment)
      .expect(HttpCode.BAD_REQUEST);
  });

  test(`API returns status code 404 when trying to change non-existent offer`, () => {
    return request(app).post(`/offers/${mockNoExistId}/comments`).send(newComment).expect(HttpCode.NOT_FOUND);
  });
});

describe(`API /offers/:offerId/comments DELETE`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/${mockSecondOfferId}/comments/${mockOfferCommentId}`);
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted comment`, () => expect(response.body.id).toBe(mockOfferCommentId));
  test(`API refuses to delete non-existent comment`, () => {
    return request(app)
      .delete(`/offers/${mockFirstOffersId}/comments/${mockNoExistId}`)
      .expect(HttpCode.NOT_FOUND);
  });
});
