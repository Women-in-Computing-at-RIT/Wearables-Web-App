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

  render() {
    return <ControlLabel>{ChangeCase.title(this.props.enumType.constructor.name)}</ControlLabel> +
      <FormControl ref={this.props.id} componentClass="select" multiple>
        {this.props.enumType.enumValues.map((e) => <option value={e.label}>{e.asOption ? e.asOption() : e.label}</option>)}
      </FormControl>;
  }
}

EnumSelect.propTypes = {
  id: React.PropTypes.string.isRequired,
  enumType: React.PropTypes.instanceOf(Enum2).isRequired
};
