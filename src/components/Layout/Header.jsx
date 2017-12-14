import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
require('../../../node_modules/animate.css/animate.min.css');

class MainHeader extends React.Component {
  getHeader () {
    if (this.props.location) {
      if (this.props.location.pathname === '/') {
        return (
          <IndexHeadContainer>
            <Navigation />
            <Hero >
              <img className='animated flipInX' src={this.props.logo} style={{ maxWidth: '80vw', maxHeight: '70vh' }} />
              <Title className='animated fadeIn'>nact ⇒ node.js + actors</Title>
              <SubTitle className='animated fadeIn' style={{ fontStyle: 'italic' }}> your services have never been so µ</SubTitle>
            </Hero>
          </IndexHeadContainer>
        );
      } else {
        return (
          <SiteContainer>
            <Navigation isSubpage />
          </SiteContainer>
        );
      }
    }
    return <div />;
  }

  render () {
    return this.getHeader();
  }
}
const Title = styled.p`
animation-delay: 250ms;
`;
const SubTitle = styled.p`
  animation-delay: 350ms;
`;

const IndexHeadContainer = styled.div`
  background: ${props => props.theme.accent};  
  padding: ${props => props.theme.sitePadding};
  text-align: center;
`;

const SiteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.brand};
  color: ${props => props.theme.accent};
  height: 100%;
  padding:  25px;
`;

const Hero = styled.div`
  padding: 50px 0;
  & > h1 {
    font-weight: 600;  
  }
`;

export default MainHeader;
