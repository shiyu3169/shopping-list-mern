import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
const Logout = props => {
  return (
    <>
      <NavLink onClick={props.logout} href='#'>
        {' '}
        Logout
      </NavLink>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Logout);
