/* eslint-disable no-undef */
import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import LanguageDrawer from './LanguageDrawer';

require('../../../node_modules/animate.css/animate.min.css');

const NavContainer = styled.div`
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
const Search = styled.div`
  position: relative;  
  input {
    display: absolute;
    font-size: 1.6rem;
    background: #2b303b;        
    color: ${props => props.isSubpage ? props.theme.accent : props.theme.brand};
    background: #fff9f9;
    border-color: ${props => props.isSubpage ? props.theme.accent : props.theme.brand};
    border-width: 1pt;
    border-style: solid;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    padding-top: 2.5pt;
    padding-bottom: 2.5pt;     
    margin-right: 10px;
    margin-top: 0px;
    z-index: 1;    
    text-indent: 20pt;
  }
  .icon {        
    height: 15pt;
    width: 15pt;
    padding: 2.5pt;
    left: 5pt;   
    right: 5pt;            
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;       
    color: #4f5b66;
    z-index: 20000;
  }
`;

const Hamburger = styled.section`
  span {
    font-size: 2em;  
  }
  button {
    background: none;
    border: none;
    color:  ${props => props.theme.accent}; 
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
  .main {
    color:  ${props => props.theme.brand};
  }

  @media (min-width: ${props => props.theme.widthLaptop}) {
    display: none;    
  }
`;

const NavLinks = styled.section`
animation-delay: 350ms;
font-size: 2em;
display: inline-flex;
@media (max-width: ${props => props.theme.widthLaptop}) {
  display: ${(props) => props.menuOpen ? 'block' : 'none'};  
  width: 100%;
  padding-top: 12px;  
  text-align: left;  

  .language-divider {
    display: none;
  }
  .language-link-js:after {
    content: ' JAVASCRIPT DOCS';
  }
  .language-link-reason:after {
    content: ' REASON DOCS';
  }
}
`;

class Navigation extends React.Component {
  constructor (...args) {
    super(...args);
    this.state = { menuOpen: false, docSearchMounted: false, languageMenuOpen: false };
  }
  mountDocsearch () {
    const searchFilter = window.location.pathname.indexOf('javascript') >= 0
      ? 'version:javascript'
      : (window.location.pathname.indexOf('reasonml') >= 0 ? 'version:reasonml' : '');
    if (!this.state.docSearchMounted) {
      docsearch({
        apiKey: '1d6174bf6b7151ce0bd244b270732d24',
        indexName: 'nact',
        inputSelector: '#search-box',
        debug: false,       // Set debug to true if you want to inspect the dropdown,
        algoliaOptions: {
          filters: searchFilter,
          attributesToRetrieve: ['*']
        }
      });
      this.setState({ docSearchMounted: true });
    }
  }

  toggleMenu () {
    this.setState({ menuOpen: !this.state.languageMenuOpen && !this.state.menuOpen });
  }

  openLanguageDrawer () {
    this.setState({ languageMenuOpen: true, menuOpen: false });
  }

  closeLanguageDrawer () {
    this.setState({ languageMenuOpen: false });
  }

  render () {
    return (
      <NavContainer isSubpage={this.props.isSubpage}>
        <section>
          {this.props.isSubpage
            ? <Link className='nav-link' to='/' ><img style={{ height: '1.5em' }} alt='logo' src='/logos/logo-wide.svg' /></Link>
            : <Link className='nav-link' to='/' ><img style={{ height: '1.5em' }} alt='logo' src='/logos/logo-wide-inverted.svg' /></Link>
          }
        </section>
        <Hamburger className={this.props.isSubpage ? ' ' : 'animated fadeIn'}>
          <button onClick={() => this.toggleMenu()} className={this.props.isSubpage ? 'subpage' : 'main'}>
            <span>{this.state.menuOpen ? '✕' : '☰'}</span>
          </button>
        </Hamburger>
        <NavLinks menuOpen={this.state.menuOpen} className={(this.props.isSubpage ? ' ' : 'animated fadeIn')}>
          {this.props.isSubpage && <Search>
            <img src='/img/search.svg' className='icon' />
            <input placeholder='search docs' type='search' ref={() => this.mountDocsearch()} className='search-box' id='search-box' />
          </Search>}
          <div>
            <a onClick={() => this.openLanguageDrawer()} className='nav-link' href='#'>
              <svg style={{ height: '1em' }} width='24' height='24' viewBox='0 0 24 24'>
                <path fill={this.props.isSubpage ? 'white' : '#FC5B5B'} d='M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z' />
              </svg>
              LANGUAGE<sup>✸</sup>
            </a>
          </div>
          <div><Link className='nav-link' to='/blog' > BLOG </Link></div>
          <div><Link className='nav-link' to='/community' > COMMUNITY </Link></div>
          <div><a className='nav-link' href='https://github.com/ncthbrt/nact'> GITHUB </a></div>
        </NavLinks>
        <LanguageDrawer closeDrawer={() => this.closeLanguageDrawer()} menuOpen={this.state.languageMenuOpen} />
      </NavContainer>
    );
  }
}

export default Navigation;
