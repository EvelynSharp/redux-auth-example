//use default state for resetting state or html 5 validation
import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';

class Auth extends React.Component {
  defaults = { email: '', password: '' }
  state = { ...this.defaults }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, history, dispatch } = this.props;
    let { email, password } = this.state;
    dispatch(authenticate(email, password, title, history))
  }

  render() {
    let { title } = this.props;
    let { email, password } = this.state;
    return (
      <div>
        <Header as="h3">{title}</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            id="email"
            label="email"
            required
            type="email"
            onChange={this.handleChange}
            value={email}
          />
          <Form.Input
            id="password"
            label="password"
            required
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          <Button>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default connect()(Auth);
