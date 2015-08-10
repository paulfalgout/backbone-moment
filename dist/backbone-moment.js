/**
 * backbone-moment - Adds a moment.js getter/setter to Backbone.Model
 * @version v0.1.0
 * @link https://github.com/paulfalgout/backbone-moment
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('underscore'), require('moment'), require('backbone')) : typeof define === 'function' && define.amd ? define(['underscore', 'moment', 'backbone'], factory) : factory(global._, global.moment, global.Backbone);
})(this, function (_, moment, Backbone) {
  'use strict';

  _.extend(Backbone.Model.prototype, {
    _moment: moment,
    moment: function moment(attr, val, opts) {
      if (_.isUndefined(val)) {
        return this.getMoment(attr, opts);
      }
      return this.setMoment.apply(this, arguments);
    },
    // override with whatever default format your endpoints expect
    formatMoment: function formatMoment(attr, val) {
      return this._moment(val).toUTC().format();
    },
    setMoment: function setMoment(attr) {
      return this.set(attr, this.formatMoment.apply(this, arguments));
    },
    getMoment: function getMoment(attr) {
      return this._moment(this.get(attr));
    }
  });
});
//# sourceMappingURL=./backbone-moment.js.map