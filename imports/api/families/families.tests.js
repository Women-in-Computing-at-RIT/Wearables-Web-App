/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callbacks, no-unused-expressions */

import {expect} from 'meteor/practicalmeteor:chai';
import {Families} from './families';

describe('Families collection', function() {
  it('registers the collection with Mongo', function() {
    expect(Families).to.be.a('object').and.not.null.and.not.undefined;
  });
});

