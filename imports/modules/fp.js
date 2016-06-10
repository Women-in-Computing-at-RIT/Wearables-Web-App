/**
 * An existential type is an alternative to null values. A value is either {@link Nothing} or
 * {@link Something}. Both types are existential but one has a value and one has no value.
 *
 * Either Existential Type should be instantiated using Existential.of and Existential.ofNothing.
 *
 * @author Matthew Crocco
 */
class Existential {
  constructor() {
    if (new.target === Existential)
      throw new TypeError('Can only instantiate subclasses of Existential!');

    const required = ['exists', 'notExists'];
    const getters = ['value'];

    let desc;

    // Ensure all properties are defined by subclass
    for (let m of required)
      if (_.isUndefined(desc = Object.getOwnPropertyDescriptor(this, this[m])))
        throw new TypeError(`The method '${m}' is undefined for ${this.constructor.name}!`);

    // Ensure all getters are defined by subclass
    for (let m of getters)
      if (_.isUndefined(desc = Object.getOwnPropertyDescriptor(this, this[m])) || _.isUndefined(desc.set))
        throw new TypeError(`Missing getter '${m}' in ${this.constructor.name}`);
  }

  /**
   * Takes a value and returns either {@link Nothing} or {@link Something}. If the value given is
   * undefined or null, Nothing is returned. Otherwise Something is returned containing the value.
   *
   * @param {any} value Some value or null/undefined
   * @returns {Existential} Nothing if value = null or undefined, otherwise Something
     */
  static of(value) {
    if(_.isUndefined(value) || _.isNull(value))
      return new Nothing();
    else
      return new Something(value);
  }

  /**
   * Always returns a {@link Nothing} instance. An alternative to 'return null', instead using
   * 'return Existential.ofNothing()'.
   *
   * @returns {Nothing} An instance representing non-existent values.
     */
  static ofNothing() {
    return new Nothing();
  }

  notExists() {
    return !this.exists();
  }
}

/**
 * An {@link Existential} type representing the non-existence of a value. Nothing.exists() returns false
 * and value is always null.
 *
 * @author Matthew Crocco
 */
class Nothing extends Existential {
  constructor() {
    super();
  }

  exists() {
    return false;
  }

  get value() {
    return  null;
  }
}

/**
 * Something represents the existence of some value, even if that value is unknown. It just is definitely
 * not null or undefined. Something.exists() always returns true and value is always some non-null, non-undefined
 * value.
 *
 * @author Matthew Crocco
 */
class Something extends Existential {
  _value;

  constructor(initial) {
    this._value = initial;
  }

  exists() {
    return true;
  }

  get value(){
    return this._value;
  }
}

export {Existential, Nothing, Something};

/**
 * A Supplier is a type wrapping a function that simply retrieves and returns an {@link Existential} type.
 * This allows for deferred retrieval.
 *
 * @author Matthew Crocco
 */
class Supplier {
  _body;

  constructor(executionBody) {
    this._body = executionBody;
  }

  get get() {
    return Existential.of(this._body());
  }
}

export {Supplier};
