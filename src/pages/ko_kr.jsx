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
        <SEO postEdges={postEdges} language={'ko_kr'} />
        <main style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ flex: 1, minHeight: '65vh' }}>
            <MainHeader
              isMain
              siteTitleAlt={config.siteTitleAlt.ko_kr}
              siteTitle={config.siteTitle}
              siteDescription={config.siteDescription}
              location={this.props.location}
              logo={config.siteLogo}
              language={'ko_kr'}
            />
          </span>
          <BodyContainer>
            <BodyContents>
              <h2>Nact는 말하자면, 서버에서 실행되는 Redux라고 생각하시면 됩니다</h2>
              <p>오늘날의 애플리케이션 서버는 10년 전과 많이 다릅니다. 그런데 왜 우리는 여전히 90년대 스타일로 프로그래밍을 하고 있을까요?</p>
              <p>Nact는 Akka와 Erlang에서 영감을 받았습니다.</p>
              <p>Nact는 오픈소스 Node.js 프레임워크로서, 아래와 같은 것들을 여러분의 프로젝트에서 가능하게 해줍니다.</p>
              <BenefitsList>
                <li>효율적인 메모리 사용</li>
                <li>탄력성(resilience), 내결함성 향상</li>
                <li>성능 향상</li>
                <li>모듈간의 의존 결합 해소(디커플링)</li>
              </BenefitsList>
              <p>Nact는 간편한 이벤트 소싱 지원과 잘 설계된 액터 모델 구현을 제공함으로써 다양한 영역에서 활용할 수 있습니다.</p>
              <p>Nact가 비록 만능은 아닙니다. 하지만 다양한 요구 사례들을 해결하기 위해 성장하고 있습니다.</p>
              <p>여러분의 프로젝트에서도 사용해 볼 만한 부분이 있겠지요?</p>
            </BodyContents>
          </BodyContainer>
          <BodyContainerInverted>
            <BodyContentsInverted>
              <h2>시작하기</h2>
              <p>Nact는 <a href='https://reasonml.github.io/' data-jzz-gui-player='true'>ReasonML</a>과 JavaScript 라이브러리로 제공됩니다. 두 가지 모두 100% 테스트 커버리지와 완벽한 문서를 제공하고, 프로젝트 메인테이너의 지원 하에 관리되고 있습니다.</p>
              <p>Nact 프레임워크의 전반적인 내용을 하루아침에 학습할 수 있습니다. 특히 <code class='highlighter-rouge'>Hello World</code> 예제를 실습하는데는 15분도 안 걸립니다.</p>
              {/* <CtaButton to={'/en_uk/lesson/reasonml/introduction'}><img style={{ height: '2.5rem' }} src='/logos/language-logo_reason-inverted.svg' /> REASONML</CtaButton> */}
              <CtaButton to={'/ko_kr/lesson/javascript/nact-%EC%86%8C%EA%B0%9C'}><img style={{ height: '2.5rem' }} src='/logos/language-logo_js-inverted.svg' /> JAVASCRIPT</CtaButton>
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
  query KoreanIndexQuery {
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
