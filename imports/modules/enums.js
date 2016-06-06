import {Enum} from 'enumify';
import {ChangeCase} from 'change-case';

class Gender extends Enum {
  static fromString(genderStr) {
    genderStr = ChangeCase.title(genderStr);

    for(let gender of Gender.enumValues)
      if(genderStr === gender.toString() || genderStr === gender.shorthand || genderStr === gender.symbolic)
        return gender;

    return null;
  }
}

Gender.initEnum({
  MALE: {
    toString() { return 'Male';},
    get shorthand() { return 'M';},
    get symbolic() { return '\u2642';}
  },
  FEMALE: {
    toString() { return 'Female';},
    get shorthand() { return 'F';},
    get symbolic() { return '\u2640';}
  }
});

class Ethnicity extends Enum {
  static fromString(ethnicStr) {
    ethnicStr = ChangeCase.upper(ethnicStr);

    for(let eth of Ethnicity.enumValues)
      if(ethnicStr === eth.name || ChangeCase.title(ethnicStr) === eth.asOption())
        return eth;

    return Ethnicity.OTHER;
  }

  toString() {
    return ChangeCase.title(this.name);
  }

  asOption() {
    return this.toString();
  }
}

Ethnicity.initEnum({
  CAUCASIAN: {
    asOption() {
      return 'White/Caucasian';
    }
  },
  BLACK: {
    asOption() {
      return 'Black/African American';
    }
  },
  ASIAN: {},
  NATIVE: {
    asOption() {
      return 'American Indian or Alaskan Native';
    }
  },
  ISLANDER: {
    asOption() {
      return 'Native Hawaiian or Other Pacific Islander';
    }
  },
  HISPANIC: {
    asOption() {
      return 'Hispanic or Latino';
    }
  },
  OTHER: {}
});
