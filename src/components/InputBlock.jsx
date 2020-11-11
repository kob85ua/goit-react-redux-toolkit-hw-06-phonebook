import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import phonebookActions from "../redux/phonebookActions";
import WarningItem from "./Warning/Warning";

import "./Styles/warningFade.css";
import {
  InputBlockWrapper,
  Label,
  Input,
  InputBlockStyled,
  InputNames,
} from "./Styles/Styles";
import Button from "./AddButton/Button";

class InputBlock extends Component {
  state = {
    name: "",
    number: "",
    isExists: false,
    notFilled: false,
  };
  componentDidMount(){
    this.props.onClearFilter("");
  }
  
  handleChange = ({ target }) => {
    this.props.filterContent !== "" && this.props.onClearFilter("");
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { existingContacts } = this.props;
    const existingContact = existingContacts.find(
      ({ name }) => name === this.state.name
    );
    if (this.state.name === "" || this.state.name === "") {
      this.setState({ notFilled: true });
    } else if (existingContact !== undefined) {
      this.setState({ isExists: true });
    } else {
      this.props.onAddContact(this.state.name, this.state.number);
    }
    this.setState({ name: "", number: "" });
    setTimeout(
      () => this.setState({ isExists: false, notFilled: false }),
      3000
    );
  };
  render() {
    const { name, number, isExists, notFilled } = this.state;
    return (
      <InputBlockWrapper>
        <InputBlockStyled onSubmit={this.handleSubmit}>
          <Label>
            <InputNames>Name</InputNames>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Label>
          <Label>
            <InputNames>Number</InputNames>
            <Input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </Label>
          <Button type="submit">Add contact</Button>
        </InputBlockStyled>
        <CSSTransition
          in={isExists || notFilled}
          timeout={250}
          classNames="warning-item-fade"
          unmountOnExit
        >
          <WarningItem
            condition={isExists}
            nextCondition={notFilled}
          ></WarningItem>
        </CSSTransition>
      </InputBlockWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  existingContacts: state.phonebook.contacts,
  filterContent: state.phonebook.filter,
});

const mapDispatchToProps = {
  onAddContact: phonebookActions.addContact,
  onClearFilter: phonebookActions.changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputBlock);
