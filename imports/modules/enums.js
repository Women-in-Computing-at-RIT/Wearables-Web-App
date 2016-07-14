import {Enum} from 'enumify';
import * as ChangeCase from 'change-case';

/* eslint-disable lodash/prefer-constant */
/**
 * Small extension of the {@link Enum} class adding a label method that gets the label of the enum option.
 *
 * @author Matthew Crocco
 * @class
 */
export class Enum2 extends Enum {
  /**
   * @returns {string} Name of enum option
     */
  get label() {
    return this.name;
  }

  /**
   * @returns {string} Display name of enum value
     */
  get displayName() {
    return this.asOption();
  }

  /**
   * @returns {string} Dispay name of enum value
     */
  asOption() {
    return this.label;
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
      if(genderStr === gender.shorthand || genderStr === gender.symbolic || genderStr === gender.label || genderStr === gender.toString())
        return gender;

    return null;
  }

  static typeName() {
    return "U_GEN";
  }

  toJSONValue() {
    return this.shorthand;
  }

  toString() {
    return ChangeCase.title(this.label);
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
   * @param {String} ethnicStr Name or Option Label for desired ethnicity
   * @returns {Ethnicity} Ethnicity associated with given string
   * @static
   */
  static fromString(ethnicStr) {
    ethnicStr = ChangeCase.upper(ethnicStr);

    for(let eth of Ethnicity.enumValues)
      if(ethnicStr === eth.label || ethnicStr === eth.name || ChangeCase.title(ethnicStr) === eth.asOption())
        return eth;

    return Ethnicity.OTHER;
  }

  static typeName() {
    return "U_ETH";
  }

  toJSONValue() {
    return this.label;
  }

  toString() {
    return ChangeCase.title(this.label);
  }

  asOption() {
    return this.toString();
  }
}

// Enum initializer for Ethnicity
//noinspection all

//noinspection JSUnresolvedFunction
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

/**
 * Enumeration of supported family relationships. Relationships can be seen as an undirected graph
 * which allows for disconnected nodes. Every two nodes can have at most one connection with each other
 * consisting of the relationship each has with the other.
 *
 * At the moment this is supported fairly verbosely with every enum value having a method relating it
 * to one other enum value.
 *
 * @author Matthew Crocco
 */
class FamilyRelationship extends Enum2 {

  /**
   * Takes either the string representation of a relationship and returns the correct
   * relationship object or null if none is found.
   *
   * @param {String} relStr Name of desired FamilyRelationship
   * @returns {FamilyRelationship} FamilyRelationship for the given name
   * @static
   */
  static fromString(relStr) {
    relStr = ChangeCase.upper(relStr);

    for(let rel of FamilyRelationship.enumValues)
      if(relStr === rel.name)
        return rel;

    return null;
  }

  relationTo(other) {
    if(other === FamilyRelationship.FATHER) {
      return this.toFather;
    }else if(other === FamilyRelationship.MOTHER){
      return this.toMother;
    }else if(other === FamilyRelationship.SON){
      return this.toSon;
    }else if(other === FamilyRelationship.DAUGHTER) {
      return this.toDaughter;
    }else if(other === FamilyRelationship.SIBLING) {
      return this.toSibling;
    }else if(other === FamilyRelationship.FAMILY) {
      return this.toFamily;
    }else if(other === FamilyRelationship.FRIEND) {
      return this.toFriend;
    } else
      return FamilyRelationship.FAMILY;
  }

  static typeName() {
    return 'FRel';
  }

  toJSONValue() {
    return this.toString();
  }

  toString() {
    return ChangeCase.title(this.label);
  }

  get toFather() {
    return FamilyRelationship.FAMILY;
  }
  get toMother() {
    return FamilyRelationship.FAMILY;
  }
  get toHusband() {
    return FamilyRelationship.FAMILY;
  }
  get toWife() {
    return FamilyRelationship.FAMILY;
  }
  get toSon() {
    return FamilyRelationship.FAMILY;
  }
  get toDaughter() {
    return FamilyRelationship.FAMILY;
  }
  get toSibling() {
    return FamilyRelationship.SIBLING;
  }
  get toFamily() {
    return FamilyRelationship.FAMILY;
  }
  get toFriend() {
    return FamilyRelationship.FRIEND;
  }
}

FamilyRelationship.initEnum({
  HUSBAND: {
    get toFather() {
      return FamilyRelationship.SON;
    },
    get toMother() {
      return FamilyRelationship.SON;
    },
    get toHusband() {
      return FamilyRelationship.HUSBAND;
    },
    get toWife() {
      return FamilyRelationship.HUSBAND;
    },
    get toSon() {
      return FamilyRelationship.FATHER;
    },
    get toDaughter() {
      return FamilyRelationship.FATHER;
    }
  },
  WIFE: {
    get toFather() {
      return FamilyRelationship.DAUGHTER;
    },
    get toMother() {
      return FamilyRelationship.DAUGHTER;
    },
    get toHusband() {
      return FamilyRelationship.WIFE;
    },
    get toWife() {
      return FamilyRelationship.WIFE;
    },
    get toSon() {
      return FamilyRelationship.MOTHER;
    },
    get toDaughter() {
      return FamilyRelationship.MOTHER;
    }
  },
  FATHER: {
    get toFather() {
      return FamilyRelationship.SON;
    },
    get toMother() {
      return FamilyRelationship.SON;
    },
    get toHusband() {
      return FamilyRelationship.HUSBAND;
    },
    get toWife() {
      return FamilyRelationship.HUSBAND;
    },
    get toSon() {
      return FamilyRelationship.FATHER;
    },
    get toDaughter() {
      return FamilyRelationship.FATHER;
    }
  },
  MOTHER: {
    get toFather() {
      return FamilyRelationship.DAUGHTER;
    },
    get toMother() {
      return FamilyRelationship.DAUGHTER;
    },
    get toHusband() {
      return FamilyRelationship.WIFE;
    },
    get toWife() {
      return FamilyRelationship.WIFE;
    },
    get toSon() {
      return FamilyRelationship.MOTHER;
    },
    get toDaughter() {
      return FamilyRelationship.MOTHER;
    }
  },
  SON: {
    get toFather() {
      return FamilyRelationship.SON;
    },
    get toMother() {
      return FamilyRelationship.SON;
    },
    get toHusband() {
      return FamilyRelationship.HUSBAND;
    },
    get toWife() {
      return FamilyRelationship.HUSBAND;
    },
    get toSon() {
      return FamilyRelationship.FATHER;
    },
    get toDaughter() {
      return FamilyRelationship.FATHER;
    }
  },
  DAUGHTER: {
    get toFather() {
      return FamilyRelationship.DAUGHTER;
    },
    get toMother() {
      return FamilyRelationship.DAUGHTER;
    },
    get toHusband() {
      return FamilyRelationship.WIFE;
    },
    get toWife() {
      return FamilyRelationship.WIFE;
    },
    get toSon() {
      return FamilyRelationship.MOTHER;
    },
    get toDaughter() {
      return FamilyRelationship.MOTHER;
    }
  },
  SIBLING: {
    get toFather() {
      return FamilyRelationship.FAMILY;
    },
    get toMother() {
      return FamilyRelationship.FAMILY;
    },
    get toHusband() {
      return FamilyRelationship.FAMILY;
    },
    get toWife() {
      return FamilyRelationship.FAMILY;
    },
    get toSon() {
      return FamilyRelationship.FAMILY;
    },
    get toDaughter() {
      return FamilyRelationship.FAMILY;
    }
  },
  FAMILY: {
    get toFather() {
      return FamilyRelationship.FAMILY;
    },
    get toMother() {
      return FamilyRelationship.FAMILY;
    },
    get toHusband() {
      return FamilyRelationship.FAMILY;
    },
    get toWife() {
      return FamilyRelationship.FAMILY;
    },
    get toSon() {
      return FamilyRelationship.FAMILY;
    },
    get toDaughter() {
      return FamilyRelationship.FAMILY;
    }
  },
  FRIEND: {
    get toFather() {
      return FamilyRelationship.FRIEND;
    },
    get toMother() {
      return FamilyRelationship.FRIEND;
    },
    get toHusband() {
      return FamilyRelationship.FRIEND;
    },
    get toWife() {
      return FamilyRelationship.FRIEND;
    },
    get toSon() {
      return FamilyRelationship.FRIEND;
    },
    get toDaughter() {
      return FamilyRelationship.FRIEND;
    }
  }
});

/**
 * Standard notification types supported.
 *
 * Alerts are 
 */
class NotificationType extends Enum2 {

  static fromString(notifStr) {
    notifStr = ChangeCase.upper(notifStr);

    for(let type of NotificationType.enumValues)
      if(notifStr === ChangeCase.upper(type.label) || notifStr === ChangeCase.upper(type.toString()))
        return type;

    return null;
  }

  static fromJSONValue(jsonValue) {
    for(let type of NotificationType.enumValues)
      if(jsonValue === type.toJSONValue())
        return type;

    return null;
  }

  static typeName() {
    return 'NOTIF';
  }

  toJSONValue() {
    return this.label;
  }
}
NotificationType.initEnum(['ALERT', 'YES_NO', 'PUSH']);

/**
 *
 */
class EmailType extends Enum2 {}
EmailType.initEnum(['VERIFY', 'FORGOT_PASSWORD']);

export {Gender, Ethnicity, FamilyRelationship, NotificationType, EmailType};

/* eslint-enable lodash/prefer-constant */
