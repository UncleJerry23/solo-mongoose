const { Router } = require('express');
const Tweet = require('../models/Tweet');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, body } = req.body;

    Tweet
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(results => res.send(results))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    return Tweet
      .findById(id)
      .then(tweet => {
        const keyToChange = Object.keys(req.body)[0];
        tweet[keyToChange] = req.body[keyToChange];
        return tweet;
      })
      .then(updatedTweet => {
        return Tweet
          .findByIdAndUpdate(id, updatedTweet, { new: true })
          .then(result => res.send(result))
          .catch(next);
      });

  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .then(results => res.send(results));
  })
  
;