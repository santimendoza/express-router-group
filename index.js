const express = require('express');

express.Router.group = function(arg1, arg2) {
  let handlerFunction, path;
  if (arg2 === undefined) {
    path = '/';
    handlerFunction = arg1;
  } else {
    path = arg1;
    handlerFunction = arg2;
  }

  const router = express.Router();
  handlerFunction(router);
  this.use(path, router);
  return this;
};
