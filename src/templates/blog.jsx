import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import UserInfo from '../components/UserInfo';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
`;

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
        <BodyContainer>
          <h2>
            {post.title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <div className='post-meta'>
            <PostTags tags={post.tags} />
          </div>
        </BodyContainer>
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
        <BodyContainer>
          <h1>
            Blog
          </h1>
          {postNodes.map((x, i) => <PostTemplate key={i} node={x.node} />)}
        </BodyContainer>
      </div>
    );
  }
}

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
