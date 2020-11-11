import React from "react";
import { connect } from "react-redux";
import phonebookActions from "../redux/phonebookActions";
import { ListItem, ContactInfo } from "./Styles/Styles";
import CrossButton from "./CrossButton/CrossButton";

const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <ListItem>
      <ContactInfo>{name}</ContactInfo>
      <ContactInfo>{number}</ContactInfo>
      <CrossButton onBtnClick={onDeleteContact}></CrossButton>
    </ListItem>
  );
};

const mapStateToProps = (state, ownProps) => {
  const currentContact = state.phonebook.contacts.find(
    (contact) => contact.id === ownProps.id
  );
  return { ...currentContact };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDeleteContact: () => dispatch(phonebookActions.deleteContact(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
