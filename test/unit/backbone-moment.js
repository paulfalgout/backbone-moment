describe('#getMoment', function() {
  describe('when getting a date', function() {

    beforeEach(function () {
      this.fooTime = moment().utc().format();
      this.myModel = new Backbone.Model({
        fooDate: this.fooTime
      });
    });

    it('should return a moment', function () {
      expect(moment.isMoment(this.myModel.getMoment('fooDate'))).to.be.true;
    });

    it('should return the same moment that was inputted', function () {
      expect(this.myModel.getMoment('fooDate').utc().format()).to.equal(this.fooTime);
    });

    describe('when the date is 0', function() {
      beforeEach(function () {
        this.myModel = new Backbone.Model({
          fooDate: 0
        });
      });

      it('should return a moment', function () {
        expect(moment.isMoment(this.myModel.getMoment('fooDate'))).to.be.true;
      });

      it('should be 1970-01-01T00:00:00+00:00', function () {
        expect(this.myModel.getMoment('fooDate').utc().format()).to.equal('1970-01-01T00:00:00+00:00');
      });
    });
  });
  describe('when getting an undefined', function() {

    beforeEach(function () {
      this.fooTime = undefined;
      this.myModel = new Backbone.Model({
        fooDate: this.fooTime
      });
    });

    it('should not return a moment', function () {
      expect(moment.isMoment(this.myModel.getMoment('fooDate'))).to.not.be.true;
    });

    it('should return undefined', function () {
      expect(this.myModel.getMoment('fooDate')).to.be.undefined;
    });
  });

});
describe('#setMoment', function() {
  describe('when setting', function() {
    beforeEach(function () {
      this.myModel = new Backbone.Model();
    });
    describe('a date string in UTC', function() {
      it('should set the string in UTC on the model', function() {
        var utcDate = '1990-01-01T02:00:00+00:00';

        this.myModel.setMoment('fooDate', utcDate);

        expect(this.myModel.get('fooDate')).to.equal(utcDate);
      });
    });
    describe('a date string in another timezone', function() {
      it('should set the string in UTC on the model', function() {
        var utcDate = '1990-01-01T02:00:00+05:00';

        this.myModel.setMoment('fooDate', utcDate);

        expect(this.myModel.get('fooDate')).to.equal(moment(utcDate).utc().format());
      });
    });
    describe('a Date()', function() {
      it('should set the string in UTC on the model', function() {
        var utcDate = '1990-01-01T02:00:00+00:00';

        var utcDateInstance = new Date(utcDate);

        this.myModel.setMoment('fooDate', utcDateInstance);

        expect(this.myModel.get('fooDate')).to.equal(utcDate);
      });
    });
    describe('a moment()', function() {
      it('should set the string in UTC on the model', function() {
        var utcDate = '1990-01-01T02:00:00+00:00';

        var utcMoment = moment(utcDate);

        this.myModel.setMoment('fooDate', utcMoment);

        expect(this.myModel.get('fooDate')).to.equal(utcDate);
      });
    });
    describe('an undefined', function() {
      it('should set an undefined', function() {
        this.myModel.setMoment('fooDate', undefined);

        expect(this.myModel.get('fooDate')).to.be.undefined;
      });
    });
  });
});
describe('#moment', function() {
  beforeEach(function() {
    this.myModel = new Backbone.Model({
      barDate: 0
    });
    this.sinon.spy(this.myModel, 'getMoment');
    this.sinon.spy(this.myModel, 'setMoment');
  });
  describe('when passing 1 argument', function() {
    beforeEach(function(){
      this.myModel.moment('barDate');
    });
    it('should call #getMoment passing the 1 argument', function() {
      expect(this.myModel.getMoment)
        .to.have.been.calledOnce
        .and.calledWith('barDate');
    });
    it('should not call #setMoment', function() {
      expect(this.myModel.setMoment)
        .to.not.have.been.called;
    });
  });
  describe('when passing more than 1 argument', function() {
    beforeEach(function(){
      this.myModel.moment('barDate', '1999-12-31 00:00:00', { silent: true });
    });
    it('should call #setMoment passing the arguments', function() {
      expect(this.myModel.setMoment)
        .to.have.been.calledOnce
        .and.calledWith('barDate', '1999-12-31 00:00:00', { silent: true });
    });
    it('should not call #getMoment', function() {
      expect(this.myModel.getMoment)
        .to.not.have.been.called;
    });
  });
});
