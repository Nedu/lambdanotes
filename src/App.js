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

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
`;

const Main = styled.div`
  display: flex;
  height: auto
`;

const requestOptions = {
  headers: {
    Authorization: localStorage.getItem('Authorization'),
    'Access-Control-Allow-Origin': '*',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.setAuthToken();
  }

  setAuthToken = () => {
    const token = localStorage.getItem('authToken');

    if(token) axios.defaults.headers.common.Authorization = token;
    else delete axios.defaults.headers.common.Authorization;
  }

  loginSuccess = (data) => {
    localStorage.setItem('authToken', `Bearer ${data.token}`);
  }

  // componentDidMount() {
  //   this.fetchNotes();
  // }

  // fetchNotes = () => {
  //   axios.get(`https://lambda-notes-app.herokuapp.com/api/v1/notes`, requestOptions)
  //   .then(res => {
  //     console.log(res);
  //     this.setState({notes: res.data, loading: false})
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  addNote = note => {
    const author = localStorage.getItem('UserId')
    note = { ...note, author };
    console.log(note);
    axios.post(`https://lambda-notes-app.herokuapp.com/api/v1/notes`, note, requestOptions)
    .then(res => {
      this.fetchNotes();
    })
    .catch(err => {
      console.log(err);
    })
  };

  deleteNote = id => {
    axios.delete(`https://lambda-notes-app.herokuapp.com/api/v1/notes/${id}`, requestOptions)
    .then(res => {
      this.fetchNotes();
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateNote = (updatedNote, id) => {
    const author = localStorage.getItem('UserId');
    updatedNote = { ...updatedNote, author };
    axios.put(`https://lambda-notes-app.herokuapp.com/api/v1/notes/${id}`, updatedNote, requestOptions)
    .then(res => {
      this.fetchNotes();
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Wrapper>
        <Main>
          <Route exact path="/notes" render={() => <Notes />} />
          <Route exact path="/createNote" render={props => <CreateNoteForm {...props} notes={this.state.notes} addNote={this.addNote} />} />
          <Route exact path="/notes/:id" render={props => <SingleNote {...props} notes={this.state.notes} deleteNote={this.deleteNote} />} />
          <Route exact path="/edit/:id" render={props => <EditNoteForm {...props} notes={this.state.notes} updateNote={this.updateNote} />} />
        </Main>
      </Wrapper>
    </React.Fragment>
  );
  }
}

export default App;
