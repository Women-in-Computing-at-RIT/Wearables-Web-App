import * as ChangeCase from 'change-case';
import React from 'react';
import {Enum2} from '../../modules/enums';

import {FormControl, ControlLabel} from 'react-bootstrap';

export class EnumSelect extends React.Component {
  getInitialState() {
    return {
      selection: null
    };
  }

  handleChange(event) {
    this.setState({
      selection: event.target.value
    });
  }

  getDefaultProps() {
    return {multiple: false};
  }

  render() {
    const initial = this.props.initialValue;
    const selectLabel = ChangeCase.title(this.props.label || this.props.enumType.constructor.name);

    return <ControlLabel>{selectLabel}</ControlLabel> +
      <FormControl ref={this.props.id} componentClass="select" multiple={this.props.multiple}>
        {_.isString(initial) ? <option selected={true} disabled={true}>{initial}</option> : null}
        {/* fills the select component with options from the specified Enum2 Type */}
        {_.map(this.props.enumType.enumValues, (e) => <option value={e.label} selected={e === initial}>{e.displayName}</option>)}
      </FormControl>;
  }
}

EnumSelect.propTypes = {
  id: React.PropTypes.string.isRequired,
  enumType: (props, propName, componentName) => {
    const propValue = props[propName];

    // required
    if(_.isNil(propValue))
      return new Error(`No value for required prop '${propName}' supplied to '${componentName}'`);

    // typeof propValue === function means propValue is LIKELY a type then we check it's prototype against Enum2
    // Essentially this allows putting enumType={Gender} instead of enumType={Gender.prototype}.
    if(!_.isFunction(propValue) || !(propValue.prototype instanceof Enum2))
      return new Error(`Invalid prop '${propName}' supplied to '${componentName}'`);
    else
      return true;
  },
  initialValue: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Enum2)
  ]),
  multiple: React.PropTypes.bool,
  label: React.PropTypes.string
};
