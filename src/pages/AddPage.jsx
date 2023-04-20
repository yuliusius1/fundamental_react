import React from "react";
import FloatingButton from "../components/FloatingButton";
import { BiCheck } from "react-icons/bi";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function AddPageWrapper() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return <AddPage navigate={handleClick} />;
}

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      note: "",
      handleClick: props.navigate,
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onNoteChangeHandler = this.onNoteChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }
  onNoteChangeHandler(event) {
    this.setState(() => {
      return {
        note: event.target.innerHTML,
      };
    });
  }
  onSubmitHandler(event) {
    event.preventDefault();
    addNote({
      title: this.state.title,
      body: this.state.note,
    });
    this.state.handleClick();
  }

  render() {
    return (
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan rahasia"
          value={this.state.title}
          onChange={this.onTitleChangeHandler}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Sebenarnya saya adalah ...."
          onInput={this.onNoteChangeHandler}
          contentEditable
        />
        <div className="add-new-page__action">
          <FloatingButton
            children={<BiCheck />}
            onClick={this.onSubmitHandler}
          />
        </div>
      </div>
    );
  }
}

AddPage.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default AddPageWrapper;
