import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Background from '../img/background.jpg';
import Header from './Header';

const StyledForm = styled(Form)`
  width: 500px;
  margin: 75px auto;
`;

const mainBg = {
  width: '100%',
  height: '100vh',
  'background-image': `url(${Background})`,
  'background-position': 'center',
  'background-repeat': 'no-repeat',
  'background-attachment': 'fixed',
  'background-size': 'cover',
};

for (const declaration in mainBg) {
  document.body.attributeStyleMap.set(declaration, mainBg[declaration]);
}
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    authenticateUser = e => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        };
        axios
          .post(`https://lambda-notes-app.herokuapp.com/api/v1/login`, user)
          .then(res => {
            console.log(res);
            localStorage.setItem('Authorization', `Bearer ${res.data.token}`);
            localStorage.setItem('UserId', `${res.data.user._id}`);            
            this.setState({ username: '', password: '' })
            this.props.history.push('/notes');
          })
          .catch(err => {
            console.log(err);
            localStorage.removeItem('Authorization');
          });
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <StyledForm onSubmit={this.authenticateUser}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="username" className="mr-sm-2">
                            UserName:
                        </Label>
                        <Input
                            type="text"
                            id="username"
                            onChange={this.handleInputChange}
                            placeholder="username"
                            name="username"
                            value={this.state.username}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="password" className="mr-sm-2">
                            Password:
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            onChange={this.handleInputChange}
                            placeholder="password"
                            name="password"
                            value={this.state.password}
                            required
                        />
                    </FormGroup>
                    <Button>Log In</Button>
                </StyledForm>
            </React.Fragment>
        );
    }
}

export default Login;