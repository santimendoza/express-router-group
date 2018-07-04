const express = require('express');

express.Router.group = function(arg1, arg2, arg3) {
  let handlerFunction = arg1;
  let path = '/';
  let middleware = undefined;

  if (arg3) {
    path = arg1;
    middleware = arg2;
    handlerFunction = arg3;
  } else if (arg2) {
    path = arg1;
    handlerFunction = arg2;
  }
  const router = express.Router();
  handlerFunction(router);
  if (middleware) {
    this.use(middleware);
  }
  this.use(path, router);
  return this;
};
