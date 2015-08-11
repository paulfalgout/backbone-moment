module.exports = function() {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var $ = require('jquery');
  var moment = require('moment');
  Backbone.$ = $;
  require('../../src/backbone-moment');

  // Set up test div
  var $testDiv = $('#testDiv');

  var setFixtures = function() {
    _.each(arguments, function(content) {
      $testDiv.append(content);
    });
  };

  var clearFixtures = function() {
    $testDiv.empty();
  };

  before(function() {
    global._ = _;
    global.Backbone = Backbone;
    global.expect = global.chai.expect;
    global.moment = moment;
  });

  beforeEach(function() {
    this.sinon = global.sinon.sandbox.create();
    global.stub = this.sinon.stub.bind(this.sinon);
    global.spy = this.sinon.spy.bind(this.sinon);
    this.setFixtures = setFixtures;
    this.clearFixtures = clearFixtures;
  });

  afterEach(function() {
    delete global.stub;
    delete global.spy;
    this.sinon.restore();
    clearFixtures();
  });
};
