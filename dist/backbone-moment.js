/**
 * backbone-moment - Adds a moment.js getter/setter to Backbone.Model
 * @version v0.2.0
 * @link https://github.com/paulfalgout/backbone-moment
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('underscore'), require('moment'), require('backbone')) : typeof define === 'function' && define.amd ? define(['underscore', 'moment', 'backbone'], factory) : factory(global._, global.moment, global.Backbone);
})(this, function (_, moment, Backbone) {
  'use strict';

  Backbone.__moment = moment;

  _.extend(Backbone.Model.prototype, {
    moment: function moment(attr, date, options) {
      if (arguments.length === 1) {
        return this.getMoment(attr);
      }
      return this.setMoment(attr, date, options);
    },
    // override with whatever default format your endpoints expect
    formatMoment: function formatMoment(attr, date) {
      return Backbone.__moment(date).utc().format();
    },
    setMoment: function setMoment(attr, date, options) {
      var dateString = date;

      // if not '', null or undefined
      if (date || date === 0) {
        dateString = this.formatMoment(attr, date, options);
      }

      return this.set(attr, dateString, options);
    },
    getMoment: function getMoment(attr) {
      var date = this.get(attr);

      // return '', null or undefined explicitly
      if (!date && date !== 0) {
        return date;
      }

      return Backbone.__moment(date);
    }
  });
});
//# sourceMappingURL=./backbone-moment.js.map