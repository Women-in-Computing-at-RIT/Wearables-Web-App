import React from 'react';

class FontAwesomeIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <i className={`fa fa-${this.props.glyph}`}>&nbsp;</i>;
  }
}

FontAwesomeIcon.propTypes = {
  glyph: React.PropTypes.string.isRequired
};

export {FontAwesomeIcon};
