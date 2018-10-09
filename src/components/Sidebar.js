import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #d6d6d6;
  width: 25%;
  padding: 20px 10px 10px 10px;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: bold;
    line-height: 1;
    letter-spacing: 3px;
    margin-bottom: 50px;
    padding: 1px 0 0 0.1em
    margin-top: 30px;
`

const Button = styled.button`
  background-color: #00b9bc;
  color: #fff;
  font-size: 1.32em;
  font-weight: bold;
  margin-bottom: 18px;
  padding: 14px 2.3em 8px 2.5em;
  cursor: pointer;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: #FFF;
  text-decoration: none;
  cursor: pointer;
`;

// const logout = (props) => {
//   localStorage.removeItem('authToken');
//   props.history.push('/');
// }

const Sidebar = (props) => {
  function logout () {
    localStorage.removeItem('authToken');
    props.history.push('/');
  }

    return <Wrapper>
      <Title>Lambda Notes</Title>
      <StyledLink to="/notes">
        <Button>View Your Notes</Button>
      </StyledLink>
      <StyledLink to="/createNote">
        <Button>Create New Note</Button>
      </StyledLink>
      <StyledLink to="/">
        <Button onClick={logout}>Log out</Button>
      </StyledLink>
    </Wrapper>;
}

export default withRouter(Sidebar);