import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Background from '../img/background.jpg';
import Header from './Header';
require('dotenv').config()

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
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledErrorDiv = styled.div`
    color: red;
    margin-bottom: 1rem;
`;

const StyledErrorText = styled.p`
    color: 'red';
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userExists: false,
        };
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addUser = e => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        };
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, user)
          .then(res => {
            this.props.onRegister(res.data)
            this.props.history.push('/notes');
            this.setState({ username: '', password: '' });
          })
          .catch(err => {
            console.log(err);
            console.log('err.response ==> ', err.response);
            if (err.response) {
                if (err.response.data && err.response.data.code === 'USEREXISTS') {
                    this.setState({ userExists: true})
                }
            }
            localStorage.removeItem('authToken');
          });
    };

    render() {
        const { userExists } = this.state;
        return (
            <React.Fragment>
                <Header />
                <StyledDiv>
                    <StyledForm onSubmit={this.addUser} >
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
                        <StyledErrorDiv>{userExists && <StyledErrorText>User Already Exists</StyledErrorText>}</StyledErrorDiv>
                        <StyledButtonDiv>
                            <StyledButton>Register</StyledButton>
                        </StyledButtonDiv>
                    </StyledForm>

                </StyledDiv>
            </React.Fragment>
        );
    }
}

export default Register;