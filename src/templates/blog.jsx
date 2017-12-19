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
        <h3 style={{paddingBottom: 0}}>{post.title}</h3>
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
    const toTime = x => new Date(x.node.frontmatter.date + 'T00:00:00Z').getTime();
    const dateSort = (a, b) => toTime(b) - toTime(a);
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
          {postNodes.sort(dateSort).reduce((prev, x, i) => [...prev, prev ? <hr /> : undefined, <PostTemplate key={i} node={x.node} />], undefined)}
        </BodyContents>
      </div>
    );
  }
}

const BodyContents = styled.div`
margin: 0 auto;
max-width: ${props => props.theme.contentWidthLaptop};
padding: ${props => props.theme.sitePadding};
@media (max-width: ${props => props.theme.widthLaptop}) {
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
