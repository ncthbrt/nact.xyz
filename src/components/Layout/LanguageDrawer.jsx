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
  animation-duration: 300ms;  
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  background: 'inherit';        
  margin:  '0 auto';        
  .nav-link {
    font-size: 1.6rem;
    margin-right: 10px;
    font-weight: 200;           
    color: props.theme.brand;
  }  
  .nav-link:hover {
    border-color: props.theme.accent;
  }
`;

const Hamburger = styled.section`
  span {
    font-size: 2em;  
  }
  button {
    background: none;
    border: none;    
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


`;

const LanguageContainer = styled.div`
  max-width: 66rem;
  padding: 2rem;
  margin: auto;

  ul {
    display: flex;
    flex-direction: row;    
    flex-wrap: wrap;    
    justify-content: center;
    width: 100%;
    list-style-type: '';
  }

  h1, h2, p { 
    color: ${props => props.theme.ink};
    text-align: center;
  }

  li {
    margin: 1rem;    
  }
`;

class LanguageDrawer extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: false, timeout: null };
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.menuOpen && !this.props.menuOpen) {
      const timeout = setTimeout(() => {
        this.setState({ open: false, timeout: null });
      }, 300);
      this.setState({ timeout: timeout });
    } else if (!prevProps.menuOpen && this.props.menuOpen) {
      this.setState({ open: true });
    }
  }

  render () {
    return (
      <LanguageDrawerDiv menuOpen={this.state.open} className={`animated ${this.props.menuOpen ? 'fadeIn' : 'fadeOut'}`}>
        <HeaderContainer>
          <section>
            {this.props.isSubpage
            ? <Link className='nav-link' to='/' ><img style={{ height: '1.5em' }} alt='logo' src='/logos/logo-wide.svg' /></Link>
            : <Link className='nav-link' to='/' ><img style={{ height: '1.5em' }} alt='logo' src='/logos/logo-wide-inverted.svg' /></Link>
          }
          </section>
          <Hamburger>
            <button onClick={() => this.props.closeDrawer()} className={'main'}>
              <span>✕</span>
            </button>
          </Hamburger>
        </HeaderContainer>
        <LanguageContainer>
          <h1>Languages</h1>
          <p>Nact documentation is available in the following languages<br />
             Nact 문서는 다음 언어로 제공됩니다.</p>
          <LanguageSection>
            <h2><img alt='javascript docs' style={{ height: '1em' }} src='/logos/language-logo_js-inverted.svg' /> JavaScript</h2>
            <div>
              <ul>
                <li><Link to='/en_uk/lesson/javascript/introduction'>English (en_uk)</Link></li>
                <li><Link to='/ko_kr/lesson/javascript/nact-%EC%86%8C%EA%B0%9C'>한국어 (ko_kr)<sup>✸</sup></Link></li>
              </ul>
            </div>
          </LanguageSection>
          <LanguageSection>
            <h2><img alt='reasonml docs' style={{ height: '1em' }} src='/logos/language-logo_reason-inverted.svg' /> ReasonML</h2>
            <ul>
              <li><Link to='/en_uk/lesson/reasonml/introduction'>English (en_uk)</Link></li>
            </ul>
          </LanguageSection>
        </LanguageContainer>
      </LanguageDrawerDiv>
    );
  }
}

export default LanguageDrawer;
