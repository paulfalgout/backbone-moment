import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';

_.extend(Backbone.Model.prototype, {
  _moment: moment,
  moment: function(attr, val, opts){
    if(_.isUndefined(val)){
      return this.getMoment(attr, opts);
    }
    return this.setMoment.apply(this, arguments);
  },
  // override with whatever default format your endpoints expect
  formatMoment: function(attr, val){
    return this._moment(val).toUTC().format();
  },
  setMoment: function(attr){
    return this.set(attr, this.formatMoment.apply(this, arguments));
  },
  getMoment: function(attr){
    return this._moment(this.get(attr));
  }
});
