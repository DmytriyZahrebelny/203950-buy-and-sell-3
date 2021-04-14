'use strict';

const mockOffers = [
  {
    "category": [
      `Книги`,
      `Разное`
    ],
    "comments": [
      {
        "id": `Fg0ikD`,
        "text": `Почему в таком ужасном состоянии?`
      },
      {
        "id": `Fg0ikD`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`
      }
    ],
    "description": `Таких предложений больше нет! Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города. Если найдёте дешевле — сброшу цену.`,
    "picture": `item09.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `SALE`,
    "sum": 79555,
    "id": `Fg0ikD`
  },
  {
    "category": [
      `Цветы`,
      `Животные`
    ],
    "comments": [
      {
        "id": `Fg0ikD`,
        "text": `Неплохо, но дорого. Совсем немного... Оплата наличными или перевод на карту?`
      },
      {
        "id": `Fg0ikD`,
        "text": `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `Fg0ikD`,
        "text": `Неплохо, но дорого. Совсем немного...`
      },
      {
        "id": `Fg0ikD`,
        "text": `Вы что?! В магазине дешевле.`
      }
    ],
    "description": `При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию. Это настоящая находка для коллекционера! Бонусом отдам все аксессуары.`,
    "picture": `item02.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `SALE`,
    "sum": 55460,
    "id": `mockId`
  },
  {
    "category": [
      `Животные`
    ],
    "comments": [
      {
        "id": `Fg0ikD`,
        "text": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ],
    "description": `Даю недельную гарантию. Продаю с болью в сердце... Товар в отличном состоянии. Если найдёте дешевле — сброшу цену.`,
    "picture": `item12.jpg`,
    "title": `Куплю породистого кота`,
    "type": `SALE`,
    "sum": 81801,
    "id": `Fg0ikD`
  }
];

const mockOfersCategories = mockOffers.reduce((acc, offer) => {
  return new Set([...acc, ...offer.category]);
}, new Set());

const mockFirstOffersId = mockOffers[0].id;
const mockSecondOfferId = mockOffers[1].id;
const mockSecondOfferTitle = mockOffers[1].title;
const mockNoExistId = `NOEXST`;
const mockNotFound = `Not found with`;
const mockOfferCommentId = mockOffers[1].comments[1].id;

const mockInvalidOffer = {
  category: `Это`,
  title: `невалидный`,
  description: `объект`,
  picture: `объявления`,
  type: `нет поля sum`
};

const mockNewOffer = {
  category: `Котики`,
  title: `Дам погладить котика`,
  description: `Дам погладить котика. Дорого. Не гербалайф`,
  picture: `cat.jpg`,
  type: `OFFER`,
  sum: 100500
};

module.exports = {
  mockOffers,
  mockOfersCategories: Array.from(mockOfersCategories),
  mockFirstOffersId,
  mockSecondOfferId,
  mockSecondOfferTitle,
  mockNoExistId,
  mockNotFound,
  mockInvalidOffer,
  mockOfferCommentId,
  mockNewOffer,
};
