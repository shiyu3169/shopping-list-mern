import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = props => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  // const toggle = () => {
  //   // Clear errors
  //   props.clearErrors();
  //   setModal(!modal);
  // };

  const toggle = useCallback(() => {
    // Clear errors
    props.clearErrors();
    setModal(!modal);
  }, [modal, props]);

  const onSubmit = e => {
    e.preventDefault();
  };

  const { error, isAuthenticated } = props;

  useEffect(() => {
    console.log(error);
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    console.log(isAuthenticated);
    if (modal && isAuthenticated) {
      toggle();
    }
  }, [error, isAuthenticated, modal, toggle]);

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
