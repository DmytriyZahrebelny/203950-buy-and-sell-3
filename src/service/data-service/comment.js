'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offerId, comment) {
    const commentsList = this._offers.find((item) => item.id === offerId);

    if (!commentsList) {
      return null;
    }

    const newComment = {id: nanoid(MAX_ID_LENGTH), text: comment.text};
    this._offers = this._offers.map((item) => {
      return item.id === offerId ? item.comments.push(newComment) : item;
    });

    return newComment;
  }

  drop(offerId, commentId) {
    const commentsList = this._offers.find((item) => item.id === offerId);

    if (!commentsList) {
      return null;
    }
    const comment = commentsList.comments.find((item) => item.id === commentId);

    if (!comment) {
      return null;
    }

    this._offers = this._offers.map((item) => {
      return item.id === offerId ? item.comments.filter(({id}) => id !== commentId) : item;
    });

    return comment;
  }

  findAll(offerId) {
    const commentsList = this._offers.find((item) => item.id === offerId);

    if (!commentsList) {
      return null;
    }

    return commentsList.comments;
  }

}

module.exports = CommentService;
