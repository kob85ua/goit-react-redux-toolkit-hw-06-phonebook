import React from "react";
import { connect } from "react-redux";

import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./Styles/listTransition.css";

const ContactList = ({ contacts }) => (
  <TransitionGroup comronent="ul" className="list">
    {contacts.map(({ id }) => (
      <CSSTransition key={id} timeout={250} classNames="list-item-fade">
        <ContactItem key={id} id={id} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

const mapStateToProps = (state) => {
  const { contacts, filter } = state.phonebook;
  const lowerCaseFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(lowerCaseFilter)
  );
  return { contacts: visibleContacts };
};

export default connect(mapStateToProps)(ContactList);
