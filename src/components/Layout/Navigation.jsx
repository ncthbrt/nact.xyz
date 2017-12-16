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

  @media (min-width: 500px) {
    display: none;    
  }
`;

const NavLinks = styled.section`
animation-delay: 350ms;
font-size: 2em;
display: inline-flex;
@media (max-width: 500px) {
  display: ${(props) => props.menuOpen ? 'block' : 'none'};  
  width: 100%;
}
`;

class Navigation extends React.Component {
  constructor (...args) {
    super(...args);
    this.state = { menuOpen: false };
  }
  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen});
  }
  render () {
    return (
      <NavContainer isSubpage={this.props.isSubpage}>
        <section>
          {this.props.isSubpage
             ? <Link className='nav-link' to='/' ><img style={{height: '1.5em'}} alt='logo' src='/logos/logo-wide.svg' /></Link>
             : undefined
          }
        </section>
        <Hamburger className={this.props.isSubpage ? ' ' : 'animated fadeIn'}>
          <button onClick={() => this.toggleMenu()} className={this.props.isSubpage ? 'subpage' : 'main'}>
            <span>{this.state.menuOpen ? '✕' : '☰'}</span>
          </button>
        </Hamburger>
        <NavLinks menuOpen={this.state.menuOpen} className={(this.props.isSubpage ? ' ' : 'animated fadeIn')}>
          <div><Link className='nav-link' to='/lesson/javascript/introduction'> <img alt='javascript' style={{height: '1em'}} src={`/logos/language-logo_js${this.props.isSubpage ? '' : '-inverted'}.svg`} /> </Link></div>
          <div className='nav-link' style={{height: '1em'}}>/</div>
          <div><Link className='nav-link' to='/lesson/reasonml/introduction' > <img alt='reason' style={{height: '1em'}} src={`/logos/language-logo_reason${this.props.isSubpage ? '' : '-inverted'}.svg`} /> </Link></div>
          <div><Link className='nav-link' to='/blog' > BLOG </Link></div>
          <div><Link className='nav-link' to='/community' > COMMUNITY </Link></div>
          <div><a className='nav-link' href='https://github.com/ncthbrt/nact'> GITHUB </a></div>
        </NavLinks>
      </NavContainer>
    );
  }
}

export default Navigation;
