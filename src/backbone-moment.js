import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';

Backbone.__moment = moment;

_.extend(Backbone.Model.prototype, {
  moment: function(attr, date, options){
    if(arguments.length === 1){
      return this.getMoment(attr);
    }
    return this.setMoment(attr, date, options);
  },
  // override with whatever default format your endpoints expect
  formatMoment: function(attr, date){
    return Backbone.__moment(date).utc().format();
  },
  setMoment: function(attr, date, options){
    var dateString = date;

    // if not '', null or undefined
    if(date || date === 0) {
      dateString = this.formatMoment(attr, date, options);
    }

    return this.set(attr, dateString, options);
  },
  getMoment: function(attr){
    var date = this.get(attr);

    // return '', null or undefined explicitly
    if(!date && date !== 0) {
      return date;
    }

    return Backbone.__moment(date);
  }
});
