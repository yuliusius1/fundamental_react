import React from "react";
import PropTypes from "prop-types";

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };

    this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onConfirmPasswordChangeHandler =
      this.onConfirmPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onNameChangeHandler(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }

  onConfirmPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        confirmpassword: event.target.value,
      };
    });
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler} className="input-register">
        <label>Name</label>
        <input
          type="text"
          value={this.state.name}
          onChange={this.onNameChangeHandler}
        />
        <label>Email</label>
        <input
          type="email"
          value={this.state.email}
          onChange={this.onEmailChangeHandler}
        />
        <label>Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChangeHandler}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={this.state.confirmpassword}
          onChange={this.onConfirmPasswordChangeHandler}
        />
        <button>Register</button>
      </form>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
