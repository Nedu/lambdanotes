import React from 'react';
import styled from 'styled-components';

import Header from './Header.js';
import Background from '../img/background.jpg';

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HomeTitle = styled.h1`
  margin: 0;
  font-family: Orbitron;
  font-size: 70px;
  font-style: italic;
  font-variant: small-caps;
  font-weight: 700;
  color: #00b9bc;
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


const Home = () => {
    return (
        <React.Fragment>
        <Header />
        <HomeContainer>
            <HomeTitle>Lambda Notes</HomeTitle>
        </HomeContainer>
        </React.Fragment>
    );
};

export default Home;