import * as ChangeCase from 'change-case';
import React from 'react';

import {Custom} from '../../modules/utility/type-checking';
import {Enum2} from '../../modules/enums';

import {FormControl, ControlLabel} from 'react-bootstrap';

export class EnumSelect extends React.Component {

  constructor(props) {
    super(_.defaults(props, {multiple: false}));

    this.state = {
      selection: null
    };
  }

  handleChange(event) {
    this.setState({
      selection: event.target.value
    });
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
  enumType: Custom.PropTypes.enumType.isRequired,
  initialValue: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Enum2)
  ]),
  multiple: React.PropTypes.bool,
  label: React.PropTypes.string
};
