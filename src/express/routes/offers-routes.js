'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {getAPI} = require(`../api`);

const api = getAPI();
const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, (req, res) => res.render(`offers/new-ticket`));

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: Array.isArray(body.category) ? body.category : [body.category],
  };

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const [offer, categories] = await Promise.all([
      api.getOffer(id),
      api.getCategories()
    ]);
    res.render(`offers/ticket-edit`, {offer, categories});
  } catch (error) {
    res.render(`offers/ticket-edit`, {offer: [], categories: []});
  }
});

offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
