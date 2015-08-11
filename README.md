Backbone-moment
====================

[![Travis Status](http://img.shields.io/travis/paulfalgout/backbone-moment/master.svg?style=flat&amp;label=travis)](https://travis-ci.org/paulfalgout/backbone-moment) [![Code Climate Score](http://img.shields.io/codeclimate/github/paulfalgout/backbone-moment.svg?style=flat)](https://codeclimate.com/github/paulfalgout/backbone-moment) [![Coverage](http://img.shields.io/codeclimate/coverage/github/paulfalgout/backbone-moment.svg?style=flat)](https://codeclimate.com/github/paulfalgout/backbone-moment) [![Dependency Status](http://img.shields.io/david/paulfalgout/backbone-moment.svg?style=flat)](https://david-dm.org/paulfalgout/backbone-moment)


## About Backbone-moment

This plugin modifies [Backbone.Model](http://backbonejs.org/#Model) adding a convienent getter/setter for date attributes using [moment.js](http://momentjs.com/)

```js
var myModel = new Backbone.Model();

var fooDate = moment('1997-1-1');

myModel.setMoment('fooDate', fooDate, { silent: true });

myModel.get('fooDate'); // returns "1997-01-01T06:00:00+00:00"

// [http://momentjs.com/docs/#/query/is-same/](http://momentjs.com/docs/#/query/is-same/)
myModel.getMoment('fooDate').isSame(fooDate); // is true
```
Additionally you can use the shorthand moment for getting and setting

```js
var fooDate = moment('1997-1-1');

myModel.moment('fooDate', fooDate, { silent: true });

myModel.moment('fooDate').isSame(fooDate); // is true
```

You can clear a moment by setting undefined, null, or ``
```js
myModel.moment('fooDate', undefined);

myModel.moment('fooDate'); // returns undefined
```


`Backbone.__moment` is a reference to moment.
If you have a modified or specially loaded moment, you will need to shim in a copy.
```js
require('backbone-moment');
Backbone.__moment = require('my-moment');
```

By default `backbone-moment` stores dates as UTC strings
Override `Backbone.Model.formatMoment` if you need to change this behavior
```js
  var MyModel = Backbone.Model.extend({
    formatMoment: function(attr, date){
      return Backbone.__moment(date).utc().format();
    }
  });
```
