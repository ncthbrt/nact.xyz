import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import PostTags from '../components/PostTags/PostTags';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';

class PostTemplate extends React.Component {
  render () {
    const { slug } = this.props.node.fields.slug;
    const postNode = this.props.node;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <div className='post-meta'>
          <PostTags tags={post.tags} />
        </div>
      </div>
    );
  }
}

export default class Blog extends React.Component {
  render () {
    const postNodes = this.props.data.allMarkdownRemark.edges;

    return (
      <div>
        <Helmet>
          <title>{`Blog | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath='/blog' />
        <Header
          siteTitle={config.siteTitle}
          siteDescription={config.siteDescription}
          location={this.props.location}
          logo={config.siteLogo}
          />
        <BodyContents>
          <h1>
            Blog
          </h1>
          {postNodes.reduce((prev, x, i) => [...prev, prev ? <hr /> : undefined, <PostTemplate key={i} node={x.node} />], undefined)}
        </BodyContents>
      </div>
    );
  }
}

const BodyContents = styled.div`
margin: 0 auto;
max-width: ${props => props.theme.contentWidthLaptop};
@media (max-width: 500px) {
  max-width: 95vw;
}
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query AllBlogPosts {
  allMarkdownRemark(filter: {frontmatter: {type: {eq: "post"}}}) {
    edges {
      node {
        html
        timeToRead
        excerpt
        frontmatter {
          title
          cover
          date
          category
          tags
        }
        fields {
          slug
        }
      }
    }
  }
}`;
