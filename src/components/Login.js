import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Background from '../img/background.jpg';
import Header from './Header';

const StyledForm = styled(Form)`
    background-color: #f5f5f5;
    padding: 5em;
    border-radius: 8px;
`;

const StyledFormGroup = styled(FormGroup)`
    margin-bottom: 1rem !important;
`;

const StyledButtonDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledButton = styled(Button)`
    background-color: #00B9BC;
    text-align: center;
    border: none;
    width: 100%;
`;

const StyledDiv = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
            this.props.onLogin(res.data)
            this.setState({ username: '', password: '' })
            this.props.history.push('/notes');
          })
          .catch(err => {
            console.log(err);
            localStorage.removeItem('authToken');
          });
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <StyledDiv>
                    <StyledForm onSubmit={this.authenticateUser}>
                        <StyledFormGroup className="mb-2 mr-sm-2 mb-sm-0">
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
                        </StyledFormGroup>
                        <StyledFormGroup className="mb-2 mr-sm-2 mb-sm-0">
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
                        </StyledFormGroup>
                        <StyledButtonDiv>
                            <StyledButton>Log In</StyledButton>
                        </StyledButtonDiv>
                    </StyledForm>
                </StyledDiv>
            </React.Fragment>
        );
    }
}

export default Login;