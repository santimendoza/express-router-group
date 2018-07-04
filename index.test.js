const routeGroup = require('./index');
const express = require('express');
let router = express.Router();
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe(`Route Group`, () => {
  it('adds group function to express router', async () => {
    expect(router.group).to.exist;
    expect(router.group).to.be.instanceOf(Function);
  });

  it('add routes to router express', async () => {
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
});
