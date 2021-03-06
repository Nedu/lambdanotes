import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import Dotdotdot from 'react-dotdotdot';
import ReactMarkdown from 'react-markdown';
import { Button, ButtonGroup } from 'reactstrap';
import { SyncLoader } from 'react-spinners';
import axios from "axios";
import { CSVLink } from 'react-csv';

import Sidebar from './Sidebar';

const Wrapper = styled.div`
  background-color: #f2f1f2;
  width: 75%;
  padding: 60px 0 70px 2.4em;
  min-height: 100vh;
`;

const Heading = styled.h3`
  font-size: 2em;
  font-weight: bold;
  line-height: 0.8;
  margin-top: 25px;
  text-align: center;
  margin-bottom: 1em;

  @media (max-width: 751px) {
    margin-top: 0;
  }
`;

const EmptyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 5rem;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;

  @media (max-width: 751px) {
    justify-content: center;
  }
`;
const IndividualNote = styled.div`
  width: 29%;
  background-color: #fff;
  padding: 12px 2em 33px 2em;
  margin: 1px 1.7em 27px 0.2em;

  @media (max-width: 1010px) {
    width: 44%;
  }

  @media (max-width: 751px) {
    width: 90%;
  }
`;

const NoteHeading = styled.h3`
    font-weight: bold;
    font-size: 1.5em;
`;

const NoteParagraph = styled.div`
    font-size: 1.4em;
    margin-top: 10px;
`;

const StyledLink = styled(Link)`
    color: #000;
    text-decoration: none;
    cursor: pointer;
`;

const Input = styled.input`
  padding: 0 1.5em 0 3.5em;
  margin: 0 3em 0 4em;
  border-radius: 3px;
  width: 25%;

  @media (max-width: 1080px) {
    width: inherit;
  }

  @media (max-width: 751px) {
    padding: 0.5em 1.5em 0.5em 3.5em;
    margin: 1em 0 0 0;
    width: 50%;
    align-self: center;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledButtonGroup = styled(ButtonGroup)`

  @media (max-width: 751px) {
    margin-left: 0;
  }

  @media (max-width: 600px) {
    display:flex;
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  background-color: #55babc;
`;

const ButtonContainer = styled.div`
  @media (max-width: 1080px) {
    margin-bottom: 0.5em;
  }

  @media (max-width: 751px) {
    align-self: center;
    margin-top: 0.5em;
  }
`;

const requestOptions = {
  headers: {
    Authorization: localStorage.getItem('authToken'),
    'Access-Control-Allow-Origin': '*',
  },
};

class Notes extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchInput: '',
        sortKey: '',
        loading: true,
        notes: [],
      }
      this.filters = {
          'Title_ASC': this.sortByTitleAscending,
          'Title_DESC': this.sortByTitleDescending
      }
  }

  handleSearchInput = e => {
      this.setState({ searchInput: e.target.value });
  }

  sortByTitleAscending = (a, b) => {
      a = a.title.toUpperCase();
      b = b.title.toUpperCase();

      if(a < b) {
          return -1;
      }
      if(a > b) {
          return 1;
      }
      return 0;
  }

  sortByTitleDescending = (a, b) => {
      a = a.title.toUpperCase();
      b = b.title.toUpperCase();

      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
  }

  componentDidMount() {
    const userID = this.props.userID();
    if(userID) {
      this.fetchNotes();
    } else {
      this.props.history.push('/');
    }
  }

  fetchNotes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
      headers: {
        Authorization: localStorage.getItem('authToken'),
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(res => {
      console.log(res);
      this.setState({notes: res.data, loading: false})
    })
    .catch(err => {
      console.log(err);
    })
  }

    render() {
    if(this.state.loading){
        return (
          <React.Fragment>
            <Sidebar notes={this.state.notes} />
            <Wrapper>
              <Heading>Your Notes:</Heading>
              <Container>
              <ButtonContainer>
                <StyledButtonGroup>
                  <StyledButton
                    onClick={() =>
                      this.setState({ sortKey: 'Title_ASC' })
                    }
                  >
                    Sort By Title Ascending
                  </StyledButton>
                  <StyledButton
                    onClick={() =>
                      this.setState({ sortKey: 'Title_DESC' })
                    }
                  >
                    Sort By Title Descending
                  </StyledButton>
                </StyledButtonGroup>
              </ButtonContainer>
              <Input type="text" value={this.state.searchInput} placeholder="Search Notes" onChange={this.handleSearchInput} />
              <CSVLink data={this.state.notes} filename={"my-notes.csv"} target="_blank"><StyledButton>Export Notes to CSV</StyledButton></CSVLink>
            </Container>
              <SyncLoader color={'#00B9BC'} loading={this.state.loading}/>
            </Wrapper>
          </React.Fragment>
        )
    }
        const sortedList = this.state.notes.sort(this.filters[this.state.sortKey]);
        return <React.Fragment>
        <Sidebar notes={this.state.notes}/>
            <Wrapper>
            <Heading>Your Notes:</Heading>
            <Container>
              <ButtonContainer>
                <StyledButtonGroup>
                  <StyledButton
                    onClick={() =>
                      this.setState({ sortKey: 'Title_ASC' })
                    }
                  >
                    Sort By Title Ascending
                  </StyledButton>
                  <StyledButton
                    onClick={() =>
                      this.setState({ sortKey: 'Title_DESC' })
                    }
                  >
                    Sort By Title Descending
                  </StyledButton>
                </StyledButtonGroup>
              </ButtonContainer>
              <Input type="text" value={this.state.searchInput} placeholder="Search Notes" onChange={this.handleSearchInput} />
              <CSVLink data={this.state.notes} filename={"my-notes.csv"} target="_blank"><StyledButton>Export Notes to CSV</StyledButton></CSVLink>
            </Container>
            {sortedList && sortedList.length <= 0  ? <EmptyListContainer><IndividualNote>No notes yet :(</IndividualNote></EmptyListContainer> : <List ref={this.dragulaDecorator}>
              {sortedList.map(note => {
                if (this.state.searchInput === '') {
                  return <IndividualNote key={note._id}>
                      <StyledLink to={`/notes/${note._id}`}>
                        <NoteHeading>{note.title}</NoteHeading>
                        <hr />
                        <Dotdotdot clamp={5}>
                          <ReactMarkdown source={note.content} />
                        </Dotdotdot>
                        <hr />
                        {/* <Badge color="info">Info</Badge> */}
                      </StyledLink>
                    </IndividualNote>;
                } else if (note.title
                    .toLowerCase()
                    .includes(
                      this.state.searchInput.toLowerCase(),
                    ) || note.content
                    .toLowerCase()
                    .includes(this.state.searchInput.toLowerCase())) {
                  return <IndividualNote key={note._id}>
                      <StyledLink to={`/notes/${note._id}`}>
                        <NoteHeading>{note.title}</NoteHeading>
                        <hr />
                        <Dotdotdot clamp={5}>
                          <NoteParagraph>{note.content}</NoteParagraph>
                        </Dotdotdot>
                        <hr />
                        {/* <Badge color="info">Info</Badge> */}
                      </StyledLink>
                    </IndividualNote>;
                }
              })}
            </List>}
          </Wrapper>
          </React.Fragment>;
    }
};

export default Notes;