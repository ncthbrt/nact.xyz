import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
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
  constructor(...args) {
    super(...args);
    this.state = { menuOpen: false, docSearchMounted: false };
  }
  mountDocsearch() {
    if (!this.state.docSearchMounted) {
      docsearch({
        apiKey: '1d6174bf6b7151ce0bd244b270732d24',
        indexName: 'nact',
        inputSelector: '#search-box',
        debug: true,       // Set debug to true if you want to inspect the dropdown,
        autocompleteOptions: {
          // See https://github.com/algolia/autocomplete.js#options
          // For full list of options
        }

      });
      this.setState({ docSearchMounted: true });
    }
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  render() {
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
          <Search className='animated flipInX'>
            <img src='/img/search.svg' className='icon' />
            <input placeholder='search docs' type='search' ref={() => this.mountDocsearch()} className='search-box' id='search-box' />
          </Search>
          <div><Link className='nav-link language-link-js' to='/lesson/javascript/introduction'> <img alt='javascript docs' style={{ height: '1em' }} src={`/logos/language-logo_js${this.props.isSubpage ? '' : '-inverted'}.svg`} /> </Link></div>
          <div className='nav-link language-divider' style={{ height: '1em' }}>/</div>
          <div><Link className='nav-link language-link-reason' to='/lesson/reasonml/introduction' > <img alt='reason docs' style={{ height: '1em' }} src={`/logos/language-logo_reason${this.props.isSubpage ? '' : '-inverted'}.svg`} /> </Link></div>
          <div><Link className='nav-link' to='/blog' > BLOG </Link></div>
          <div><Link className='nav-link' to='/community' > COMMUNITY </Link></div>
          <div><a className='nav-link' href='https://github.com/ncthbrt/nact'> GITHUB </a></div>
        </NavLinks>
      </NavContainer>
    );
  }
}

export default Navigation;
