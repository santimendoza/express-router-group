const routeGroup = require('./index');
const express = require('express');

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe(`Route Group`, () => {
  it('adds group function to express router', async () => {
    let router = express.Router();
    expect(router.group).to.exist;
    expect(router.group).to.be.instanceOf(Function);
  });

  it('add routes to router express', async () => {
    let router = express.Router();
    const group = router.group('/test', router => {
      router.get('/first-endpoint', () => {});
      router.get('/first-endpoint2', () => {});
    });
    expect(router.stack[0].regexp.toString()).equals(
      /^\/test\/?(?=\/|$)/i.toString()
    );
    expect(router.stack[0].handle.stack[0].regexp.toString()).contains(
      /^\/first-endpoint\/?$/i.toString()
    );
    expect(router.stack[0].handle.stack[1].regexp.toString()).contains(
      /^\/first-endpoint2\/?$/i.toString()
    );
  });

  it('add middleware to router group', async () => {
    let router = express.Router();
    function testMiddleware(req, res, next) {
      console.log('Applying middleware');
      next();
    }
    const group = router.group('/test', testMiddleware, router => {
      router.get('/first-endpoint', () => {});
      router.get('/first-endpoint2', () => {});
    });
    expect(group.stack[0].handle.stack[0].name).equals('testMiddleware');
    expect(router.stack[0].regexp.toString()).equals(
      /^\/test\/?(?=\/|$)/i.toString()
    );
    expect(router.stack[0].handle.stack[1].regexp.toString()).contains(
      /^\/first-endpoint\/?$/i.toString()
    );
    expect(router.stack[0].handle.stack[2].regexp.toString()).contains(
      /^\/first-endpoint2\/?$/i.toString()
    );
  });
});
