import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./contactFilter.css"

class ContactFilter extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <label className="filter-input-label">
        Filter contacts by name:
        <input type="text" value={value} onChange={onChange} />
      </label>
    );
  }
}

ContactFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
