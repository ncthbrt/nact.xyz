import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
require('../../../node_modules/animate.css/animate.min.css');

const LanguageSection = styled.section`
  colour: red;
`;

class LanguageDrawer extends React.Component {
  render () {
    return (
      <div>
        <h1>Languages</h1>
        <LanguageSection>
          <h2>JavaScript</h2>
          <div>
            <ul>
              <li>English</li>
              <li>Korean</li>
            </ul>
          </div>
        </LanguageSection>
        <LanguageSection>
          <h2>ReasonML</h2>
          <ul>
            <li>English</li>
          </ul>        
        </LanguageSection>
      </div>
    );
  }
}

export default LanguageDrawer;
