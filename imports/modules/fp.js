/**
 * An existential type is an alternative to null values. A value is either {@link Nothing} or
 * {@link Something}. Both types are existential but one has a value and one has no value.
 *
 * Either Existential Type should be instantiated using Existential.of and Existential.ofNothing.
 *
 * @author Matthew Crocco
 */
class Existential {
  constructor(value) {
    this._value = value;
  }

  /**
   * Takes a value and returns either {@link Nothing} or {@link Something}. If the value given is
   * undefined or null, Nothing is returned. Otherwise Something is returned containing the value.
   *
   * @param {any} value Some value or null/undefined
   * @returns {Existential} Nothing if value = null or undefined, otherwise Something
     */
  static of(value) {
    if(_.isNil(value))
      return Existential._EMPTY;
    else
      return new Existential(value);
  }

  /**
   * Always returns a {@link Existential} instance. An alternative to 'return null', instead using
   * 'return Existential.empty()'.
   *
   * @returns {Existential} An Existential representing a non-existent values.
   */
  static empty() {
    return Existential._EMPTY;
  }

  /**
   * Always returns a {@link Existential} instance. An alternative to 'return null', instead using
   * 'return Existential.ofNothing()'.
   *
   * @returns {Existential} An Existential representing a non-existent values.
   * @deprecated
     */
  static ofNothing() {
    return Existential.empty();
  }

  get value() {
    if(this.notExists())
      throw new Error('Attempt to exist non-existent value! (Value is nil).');

    return this._value;
  }

  exists() {
    return !this.notExists();
  }

  notExists() {
    return _.isNil(this._value);
  }
}

Existential._EMPTY = new Existential(null);

export {Existential};

/**
 * A Supplier is a type wrapping a function that simply retrieves and returns an {@link Existential} type.
 * This allows for deferred retrieval.
 *
 * @author Matthew Crocco
 */
class Supplier {

  constructor(executionBody) {
    this._body = executionBody;
  }

  get get() {
    return Existential.of(this._body());
  }
}

export {Supplier};
