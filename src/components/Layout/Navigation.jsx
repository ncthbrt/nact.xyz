import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: ${props => props.isSubpage ? props.theme.brand: props.theme.accent};        
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
          <Link className='nav-link' to='/' > HOME </Link>
          <Link className='nav-link' to='/docs/reasonml/introduction' > DOCS </Link>
          <Link className='nav-link' to='/contact' > CONTACT </Link>
        </section>        
      </NavContainer>
    )
  }
}

export default Navigation