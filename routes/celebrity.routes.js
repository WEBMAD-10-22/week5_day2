const express = require('express');
const CelebrityModel = require('../models/Celebrity.model');
const router = express.Router();

// /celebrities

// ---- GET ----

router.get('/create', (req, res) => {
  res.render('celebrities/create');
});

router.get('/list', (req, res, next) => {
  CelebrityModel.find() // --> [] | Document[]
    .then((celebrities) => {
      res.render('celebrities/list', { celebrities });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/detail/:idCelebrity', (req, res, next) => {
  const { idCelebrity } = req.params;

  CelebrityModel.findById(idCelebrity)
    .then((celebrity) => {
      res.render('celebrities/index', celebrity);
    })
    .catch((err) => next(err));
});

router.get('/delete/:id', (req, res, next) => {
  const { id } = req.params;

  CelebrityModel.findByIdAndDelete(id)
    .then(() => res.redirect('/celebrities/list'))
    .catch(next);
});

router.get('/edit/:id', (req, res, next) => {
  const { id } = req.params;

  CelebrityModel.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', celebrity);
    })
    .catch(next);
});

// ---- POST ---

router.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  CelebrityModel.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.render('celebrities/index', celebrity);
    })
    .catch((err) => next(err));
});

router.post('/edit/:id', (req, res, next) => {
  const { name, occupation, phrase } = req.body;
  const { id } = req.params;

  CelebrityModel.findByIdAndUpdate(id, {
    name,
    occupation,
    catchPhrase: phrase,
  }, { new: true })
    .then((celebrity) => {
      res.render('celebrities/index', celebrity);
    })
    .catch(next);
});

module.exports = router;
