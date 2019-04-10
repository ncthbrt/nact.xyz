import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'gatsby-link';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import MainHeader from '../components/Layout/Header';
import CtaButton from '../components/CtaButton';

class Index extends React.Component {
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className='index-container'>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <main style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ flex: 1, minHeight: '65vh' }}>
            <MainHeader
              siteTitle={config.siteTitle}
              siteDescription={config.siteDescription}
              location={this.props.location}
              logo={config.siteLogo}
            />
          </span>
          <BodyContainer>
            <BodyContents>
              <h2>Nact is redux but for the server.</h2>
              <p>Servers today are very different from those even 10 years ago. So why are we still programming like it's the 90s?</p>
              <p>Inspired by the approaches taken by Akka and Erlang, nact is an open source Node.js framework which enables you to take control of your state to:</p>
              <BenefitsList>
                <li>more effectively use memory</li>
                <li>improve application resiliance</li>
                <li>increase performance</li>
                <li>reduce coupling</li>
              </BenefitsList>
              <p>With out of the box support for event sourcing, and a considered implementation of the actor model, nact can work across a wide variety of domains.
              </p>
              <p>Nact is no silver bullet, but it is evolving to tackle ever more demanding use cases. Perhaps one of them is yours?</p>
            </BodyContents>
          </BodyContainer>
          <BodyContainerInverted>
            <BodyContentsInverted>
              <h2>Getting Started</h2>
              <p>Both the ReasonML and JS libraries are 1<sup>st</sup> class citizens. This means 100% unit test coverage, full documentation and support by project maintainers.</p>
              <p>Learning the ins and outs of the framework should not take more than an evening. The hello world example in particular should take less than 15 minutes.</p>
              <CtaButton to={'/en_uk/lesson/reasonml/introduction'}><img style={{ height: '2.5rem' }} src='/logos/language-logo_reason-inverted.svg' /> REASONML</CtaButton>
              <CtaButton to={'/en_uk/lesson/javascript/introduction'}><img style={{ height: '2.5rem' }} src='/logos/language-logo_js-inverted.svg' /> JAVASCRIPT</CtaButton>
            </BodyContentsInverted>
          </BodyContainerInverted>
        </main>
      </div>
    );
  }
}

export default Index;

const BenefitsList = styled.ul`
  list-style-type: '✔ ';       
  li { 
    padding-right: 25px;
  }
`;

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};  
  background: ${props => props.theme.brand};    
`;

const BodyContainerInverted = styled.div`
padding: ${props => props.theme.sitePadding};  
padding-bottom: 16rem;
`;

const BodyContents = styled.div`
margin: 0 auto;
max-width: ${props => props.theme.contentWidthLaptop};
color:  ${props => props.theme.accent};
`;

const BodyContentsInverted = styled.div`
margin: 0 auto;
max-width: ${props => props.theme.contentWidthLaptop};
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges { 
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags            
            date
          }
        }
      }
    }
  }
`;
