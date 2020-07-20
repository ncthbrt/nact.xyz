import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import LanguageDrawer from './LanguageDrawer';
require('../../../node_modules/animate.css/animate.min.css');

class MainHeader extends React.Component {
  getHeader () {
    if (this.props.isMain) {
      return (
        <IndexHeadContainer>
          <Navigation language={this.props.language} isSubpage={false} />
          <Hero >
            <img className='animated flipInX' src={this.props.logo} style={{ maxWidth: '80vw', maxHeight: '70vh' }} />
            <Title className='animated fadeIn'>nact ⇒ node.js + actors</Title>
            <SubTitle className='animated fadeIn' style={{ fontStyle: 'italic' }}>{this.props.siteTitleAlt}</SubTitle>
          </Hero>
        </IndexHeadContainer>
      );
    } else {
      return (
        <SiteContainer>
          <Navigation isSubpage language={this.props.language} />
        </SiteContainer>
      );
    }
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
