import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ItemModal = props => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: name
    };
    // Add item via addItem action
    props.addItem(newItem);
    toggle();
  };

  const onChange = e => {
    setName(e.target.value);
  };

  return (
    <div>
      {props.isAuthenticated ? (
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            setModal(!modal);
          }}
        >
          Add Item
        </Button>
      ) : (
        <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                id='item'
                placeholder='Add Shopping item'
                onChange={onChange}
                value={name}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

ItemModal.propTypes = {
  isAuthenticated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
