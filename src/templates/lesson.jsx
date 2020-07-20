import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import SEO from '../components/SEO/SEO';
import SiteHeader from '../components/Layout/Header';
import config from '../../data/SiteConfig';
import TableOfContents from '../components/Layout/TableOfContents';

export default class LessonTemplate extends React.Component {
  render () {
    const { slug, language } = this.props.pathContext;

    const postNode = this.props.data.postBySlug;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer className='header'>
            <SiteHeader location={this.props.location} language={language} />
          </HeaderContainer>
          <BodyContainer className='content'>
            <article>
              <h1>
                {post.title}
              </h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </article>
          </BodyContainer>
          <ToCContainer className='nav'>
            <TableOfContents
              posts={this.props.data.allPostTitles.edges}
              contentsType='lesson'
              language={language}
              chapterTitles={config.toCChapters}
            />
          </ToCContainer>
        </BodyGrid>
      </div>
    );
  }
}

const BodyGrid = styled.div`  
  width: 100vw;
  display: grid;  
  grid-template-areas: 
    "header"
    "content"
    "nav";    
      
  @media (min-width: ${props => props.theme.widthLaptop}) {
    height: 100vh;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 75px 1fr;
    grid-template-areas: 
      "header  header"      
      "nav content";
    #nav {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const BodyContainer = styled.div`
  grid-area: content;  
  justify-self: center;  
  width: 100%;     
  padding: ${props => props.theme.sitePadding};
  padding-bottom: 0;
  padding-top: 0;
  & > article {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }  
  & > h1 {
    color: ${props => props.theme.accentDark};
  }
  @media (max-width: ${props => props.theme.widthLaptop}) {
    max-width: 95vw;
  }
  @media (min-width: ${props => props.theme.widthLaptop}) {
    overflow: scroll;
    padding-bottom: ${props => props.theme.sitePadding};
  }
`;

const HeaderContainer = styled.div`
  grid-area: header;
  width: 100%;  
  z-index: 2;
`;

const ToCContainer = styled.div`
  grid-area: nav;
  padding-top: 0
  @media (min-width: ${props => props.theme.widthLaptop}) {
    overflow: scroll;
    padding-top: ${props => props.theme.sitePadding};
  }  
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LessonBySlug($slug: String!, $programming_language: String!, $language: String!) {
    allPostTitles: allMarkdownRemark(filter: { frontmatter: { programming_language:{ eq: $programming_language }, language:{ eq: $language } }}){
        edges {
          node {
            frontmatter {
              title
              lesson
              programming_language
              chapter              
              type                            
            }
            fields {
              slug
            }
          }
        }
      }
      postBySlug: markdownRemark(fields: { slug: { eq: $slug } }, frontmatter: { programming_language: { eq: $programming_language }}) {
        html
        timeToRead
        excerpt
        frontmatter {
          title          
          date
          programming_language
          tags          
        }
        fields {
          slug
        }
      } 
  }
`;
