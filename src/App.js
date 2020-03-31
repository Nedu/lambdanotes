import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import axios from "axios";

import Home from './components/Home.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Notes from './components/Notes.js';
import CreateNoteForm from './components/CreateNoteForm.js';
import SingleNote from './components/SingleNote.js';
import EditNoteForm from './components/EditNoteForm.js';
import './App.css';

require('dotenv').config()

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
`;

const Main = styled.div`
  display: flex;
  height: 100vh
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      username: ''
    }

    this.setAuthToken();
  }

  setAuthToken = () => {
    const token = localStorage.getItem('authToken');

    if(token) axios.defaults.headers.common.Authorization = token;
    else delete axios.defaults.headers.common.Authorization;
  }

  authSuccess = (data) => {
    localStorage.setItem('authToken', `Bearer ${data.token}`);
    this.setState({ username: data.user.username, userID: data.user._id })
  }

  getUserID() {
		const token = localStorage.getItem('authToken');

		if (token) {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');

			return JSON.parse(window.atob(base64)).sub;
		}
	}

  render() {
    return (
      <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" render={props => <Register {...props} onRegister={this.authSuccess} /> } />
      <Route exact path="/login" render={props => <Login {...props} onLogin={this.authSuccess} /> } />
      <Wrapper>
        <Main>
          <Route exact path="/notes" render={props => <Notes {...props} userID={this.getUserID} />} />
          <Route exact path="/createNote" render={props => <CreateNoteForm {...props} userID={this.getUserID} />} />
          <Route exact path="/notes/:id" render={props => <SingleNote {...props} userID={this.getUserID} />} />
          <Route exact path="/edit/:id" render={props => <EditNoteForm {...props} userID={this.getUserID} />} />
        </Main>
      </Wrapper>
    </React.Fragment>
  );
  }
}

export default App;
