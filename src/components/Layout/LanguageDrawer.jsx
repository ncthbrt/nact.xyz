import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Link from 'gatsby-link';
require('../../../node_modules/animate.css/animate.min.css');

const LanguageSection = styled.section`
`;

const LanguageDrawerDiv = styled.div`
  display: ${(props) => props.menuOpen ? 'inline' : 'none'};  
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  padding: 25px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  background: ${props => props.isSubpage ? props.theme.brand : 'inherit'};        
  margin: ${props => props.isSubpage ? 'inherit' : '0 auto'};        
  .nav-link {
    font-size: 1.6rem;
    margin-right: 10px;
    font-weight: 200;           
    color: ${props => props.isSubpage ? props.theme.accent : props.theme.brand};      
  }  
  .nav-link:hover {
    border-color:  ${props => props.isSubpage ? props.theme.accent : props.theme.brand};
  }
`;

const Hamburger = styled.section`
  span {
    font-size: 2em;  
  }
  button {
    background: none;
    border: none;
    // color:  ${props => props.theme.accent}; 
    color:  ${props => props.theme.brand};
  }  
  
  button:active {
    background: #FFF0F;
  }
  
  border-radius: 50%;
  
  button {
    left: 0.25em;    
    bottom: 0.25em;
    padding: 0;
    width: 2.5em;
    height: 2.5em;
  }

  animation-delay: 350ms;
  /*.main {
    color:  ${props => props.theme.brand};
  }*/

`;

class LanguageDrawer extends React.Component {
  render () {
    return (
      <LanguageDrawerDiv menuOpen={this.props.menuOpen}>
        <HeaderContainer>
          <section>
            {this.props.isSubpage
            ? <Link className='nav-link' to='/' ><img style={{ height: '1.5em' }} alt='logo' src='/logos/logo-wide.svg' /></Link>
            : <Link className='nav-link' to='/' ><img style={{ height: '1.5em' }} alt='logo' src='/logos/logo-wide-inverted.svg' /></Link>
          }
          </section>
          <Hamburger className={this.props.isSubpage ? ' ' : 'animated fadeIn'}>
            <button onClick={() => this.toggleMenu()} className={this.props.isSubpage ? 'subpage' : 'main'}>
              <span>✕</span>
            </button>
          </Hamburger>
        </HeaderContainer>
        <h1>Languages</h1>
        <div>Nact documentation is available in the following languages:</div>
        <div>Nact 문서는 다음 언어로 제공됩니다.</div>
        <LanguageSection>
          <h2>JavaScript</h2>
          <div>
            <ul>
              <li>English (en_uk)</li>
              <li>한국어 (ko_kr)</li>
            </ul>
          </div>
        </LanguageSection>
        <LanguageSection>
          <h2>ReasonML</h2>
          <ul>
            <li>English (en_uk)</li>
          </ul>
        </LanguageSection>
      </LanguageDrawerDiv>
    );
  }
}

export default LanguageDrawer;
