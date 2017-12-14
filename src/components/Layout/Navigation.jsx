import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: ${props => props.isSubpage ? props.theme.brand: props.theme.accent};        
  margin: ${props => props.isSubpage ? 'inherit': '0 auto'};        
  .nav-link {
    font-size: 1.6rem;
    margin-right: 10px;
    font-weight: 200;           
    color: ${props => props.isSubpage ? props.theme.accent: props.theme.brand};      
  }  
  .nav-link:hover {
    border-color:  ${props => props.isSubpage ? props.theme.accent: props.theme.brand};
  }
`

class Navigation extends React.Component {

  render() {
    return (
      <NavContainer isSubpage={this.props.isSubpage}>
        <section>
          <Link className='nav-link' to='/' ><img style={{height: '1.5em'}} alt="logo" src="/logos/logo-wide.svg" /></Link>
        </section>
        <section>          
          <Link className='nav-link' to='/lesson/reasonml/introduction' > DOCS </Link>
          <Link className='nav-link' to='/contact' > COMMUNITY </Link>
        </section>                
      </NavContainer>
    )
  }
}

export default Navigation