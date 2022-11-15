const CelebrityModel = require('../models/Celebrity.model');
const MovieModel = require('../models/Movie.model');

const router = require('express').Router();

// ---- GET ----

router.get('/create', (req, res) => {
  res.render('movie/create');
});

router.get('/:idMovie', (req, res, next) => {
  const { idMovie } = req.params;

  MovieModel.findById(idMovie)
    .populate('cast')
    .then((movie) => {
      res.render('movie/index', movie);
    })
    .catch(next);
});

// ---- POST ----

router.post('/create', (req, res, next) => {
  const { title, genre, plot, name } = req.body;

  CelebrityModel.findOne({ name: name.trim() })
    .then((celebrity) => {
      if (!celebrity) {
        return res.render('movie/create', {
          messageError: 'Not found celebrity. Try again!',
        });
      }
      return MovieModel.create({ title, genre, plot, cast: [celebrity._id] });
    })
    .then((movie) => {
      res.render('movie/index', movie);
    })
    .catch((err) => next(err));
});

module.exports = router;
