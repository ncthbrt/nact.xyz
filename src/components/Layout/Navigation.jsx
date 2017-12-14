import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
require('../../../node_modules/animate.css/animate.min.css');

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

class Navigation extends React.Component {
  render () {
    return (
      <NavContainer isSubpage={this.props.isSubpage}>
        <section>
          {this.props.isSubpage
             ? <Link className='nav-link' to='/' ><img style={{height: '1.5em'}} alt='logo' src='/logos/logo-wide.svg' /></Link>
             : undefined
          }
        </section>
        <section style={{animationDelay: '350ms'}} className={this.props.isSubpage ? ' ' : 'animated fadeIn'}>
          <Link className='nav-link' to='/lesson/javascript/introduction'> <img alt='javascript' style={{height: '1em'}} src={`/logos/language-logo_js${this.props.isSubpage ? '' : '-inverted'}.svg`} /> </Link>
          <span className='nav-link' style={{height: '1em'}}>/</span>
          <Link className='nav-link' to='/lesson/reasonml/introduction' > <img alt='reason' style={{height: '1em'}} src={`/logos/language-logo_reason${this.props.isSubpage ? '' : '-inverted'}.svg`} /> </Link>
          <Link className='nav-link' to='/blog' > BLOG </Link>
          <Link className='nav-link' to='/community' > COMMUNITY </Link>
          <a className='nav-link' href='https://github.com/ncthbrt/nact'> GITHUB </a>
        </section>
      </NavContainer>
    );
  }
}

export default Navigation;
