'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  async findAll(searchText) {
    return this._offers
      .filter(({title}) => title.toLowerCase().includes(searchText.toLowerCase()));
  }

}

module.exports = SearchService;
