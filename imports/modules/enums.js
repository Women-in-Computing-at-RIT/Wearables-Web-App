import {Enum} from 'enumify';
import * as ChangeCase from 'change-case';

/**
 * Small extension of the {@link Enum} class adding a label method that gets the label of the given enum option.
 *
 * @author Matthew Crocco
 * @class
 */
class Enum2 extends Enum {

  /**
   * @returns {string} Name of enum option
     */
  label() {
    let tmp = super.toString();
    let i = tmp.indexOf('.');
    return tmp.substring(i+1);
  }
}

/**
 * An enumeration of genders, not limited to just two for future cases. A Gender has string name (e.g. Female),
 * a shorthand representation (e.g. M) and a symbolic representation (e.g. Symbol of Venus for Female).
 *
 * @author Matthew Crocco
 * @class
 */
class Gender extends Enum2 {
  /**
   * Takes either the name, shorthand representation or symbolic representation and returns the associated gender
   * or null if no Gender is found.
   *
   * @param {String} genderStr Name, Symbol or Shorthand for desired Gender
   * @returns {Gender} Gender associated with given string
   * @static
     */
  static fromString(genderStr) {
    genderStr = ChangeCase.title(genderStr);

    for(let gender of Gender.enumValues)
      if(genderStr === gender.toString() || genderStr === gender.shorthand || genderStr === gender.symbolic)
        return gender;

    return null;
  }

  toString() {
    return ChangeCase.title(super.label());
  }
}

// Enum Initializer for Genders
Gender.initEnum({
  MALE: {
    get shorthand() {
      return 'M';
    },
    get symbolic() {
      return '\u2642';
    }
  },
  FEMALE: {
    get shorthand() {
      return 'F';
    },
    get symbolic() {
      return '\u2640';
    }
  }
});

/**
 * An enumeration of ethnicities. The supported ethnicities as those listed in federal standards. An ethnicity
 * supports toString returning the Enum name in title case and an asOption method that returns the label to be displayed
 * for selections.
 *
 * @author Matthew Crocco
 * @class
 */
class Ethnicity extends Enum2 {

  /**
   * Takes either the option representation or the string representation of an ethnicity and returns the correct
   * ethnicity object or null if none is found.
   *
   * @param {String} ethnicStr Name or Option Label for desired Gender
   * @returns {Ethnicity} Ethnicity associated with given string
   * @static
   */
  static fromString(ethnicStr) {
    ethnicStr = ChangeCase.upper(ethnicStr);

    for(let eth of Ethnicity.enumValues)
      if(ethnicStr === eth.name || ChangeCase.title(ethnicStr) === eth.asOption())
        return eth;

    return Ethnicity.OTHER;
  }

  toString() {
    return ChangeCase.title(super.label());
  }

  asOption() {
    return this.toString();
  }
}

// Enum initializer for Ethnicity
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


export {Gender, Ethnicity};
