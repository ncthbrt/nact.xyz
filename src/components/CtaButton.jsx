import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

class ctaButton extends Component {
  render () {
    const { children } = this.props;
    return (
      <Link style={{border: 'none'}} to={this.props.to}>
        <ButtonContainer>
          {children}
        </ButtonContainer>
      </Link>
    );
  }
}

export default ctaButton;

const ButtonContainer = styled.div`
  border: 1px solid ${props => props.theme.brand};
  border-radius: 3px;  
  padding-left: 0.5em;  
  padding-right: 0.5em;  
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 2rem;
  margin-bottom: 0.25em;
  margin-right: 0.25em;  
  margin-top: 0;
  color: ${props => props.theme.brand};
  display: inline-block;
  transition: all .3s ease;
  height: 5rem;  
  &:hover {
    color: ${props => props.theme.accent};
    background: ${props => props.theme.brand};
  }  
`
;
