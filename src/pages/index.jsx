import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"

import SEO from "../components/SEO/SEO"
import config from "../../data/SiteConfig"
import MainHeader from '../components/Layout/Header'
import CtaButton from '../components/CtaButton'

class Index extends React.Component {

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <main style={{minHeight : '100vh', display: 'flex', flexDirection: 'column'}}>
          <MainHeader
            siteTitle={config.siteTitle}
            siteDescription={config.siteDescription}
            location={this.props.location}
            logo={config.siteLogo}
          />
          <BodyContainer>
            <BodyContents>
              <h2>A Gatsby Template for Content</h2>
              <p>Made for modern documentation sites. Table of Contents automatically generated from markdown files. </p>
              <CtaButton to={'/lesson/reasonml/introduction'}>See Your First Post</CtaButton>
            </BodyContents>
          </BodyContainer>
        </main>
      </div>
    );
  }
}

export default Index;

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};  
  background: ${props => props.theme.brand};
  display: flex;
  flex: 1;  
`
const BodyContents = styled.div`
margin: 0 auto;
max-width: ${props => props.theme.contentWidthLaptop};
color:  ${props => props.theme.accent};
`


/* eslint no-undef: "off"*/
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
            cover
            date
          }
        }
      }
    }
  }
`;
