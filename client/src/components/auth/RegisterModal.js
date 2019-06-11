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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = props => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
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
    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    props.register(newUser);
  };

  const { error, isAuthenticated } = props;

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal

    if (modal && isAuthenticated) {
      toggle();
    }
  }, [error, isAuthenticated, modal, toggle]);

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </FormGroup>
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
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
