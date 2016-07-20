/**
 * An existential type is an alternative to null values. A value is either Nothing or
 * Something. Both types are existential (and an Maybe instance) but one has a value and one has no value.
 *
 * Since JavaScript is itself supporting of functional programming operations, making Nothing and Something
 * separate types was unnecessary (and potentially confusing). Nothing is equivalent to Maybe(null|undefined) and Some is
 * equivalent to Maybe(any).
 *
 * @author Matthew Crocco
 */
class Maybe {
  constructor(value) {
    this._value = value;
  }

  /**
   * Takes a value and returns either Nothing or Something. If the value given is
   * undefined or null, Nothing is returned. Otherwise Something is returned containing the value.
   *
   * @param {any} value Some value or null/undefined
   * @returns {Maybe} Nothing if value = null or undefined, otherwise Something
     */
  static of(value) {
    if(_.isNil(value))
      return Maybe._NOTHING;
    else
      return new Maybe(value);
  }

  /**
   * Always returns a {@link Maybe} instance. An alternative to 'return null', instead using
   * 'return Maybe.empty()'. See class-level comments for Maybe to view details on Something and Nothing.
   *
   * @returns {Maybe} An Maybe representing a non-existent values.
   */
  static empty() {
    return Maybe._NOTHING;
  }

  /**
   * Always returns a {@link Maybe} instance. An alternative to 'return null', instead using
   * 'return Maybe.ofNothing()'.
   *
   * @returns {Maybe} An Maybe representing a non-existent values.
   * @deprecated
     */
  static ofNothing() {
    return Maybe.empty();
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

// Could also be "undefined" because of the isNil test.
// Static value representing nothing, we don't need many Nothing instances running around...
// there are many somethings, but only one nothing.
Maybe._NOTHING = new Maybe(null);

export {Maybe};
