import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../../../data/SiteConfig';
import MainHeader from '../../components/Layout/Header';

const BodyContainer = styled.div`
margin: 0 auto;
max-width: ${props => props.theme.contentWidthLaptop};
padding: ${props => props.theme.sitePadding};
@media (max-width: ${props => props.theme.widthLaptop}) {
  max-width: 95vw;
}
`;

class CommunityPage extends React.Component {
  render () {
    return (
      <div className='index-container'>
        <Helmet title={config.siteTitle} />
        <main>
          <MainHeader
            language='ko_kr'
            siteTitle={config.siteTitle}
            siteDescription={config.siteDescription}
            location={this.props.location}
            logo={config.siteLogo}
          />
          <BodyContainer>
            <h1>커뮤니티</h1>
            <p>Nact는 오픈소스 프로젝트입니다. 소스코드를 포함한 개발에 관한 모든 내용은 <a href='https://github.com/ncthbrt/nact'>github</a>에서 호스팅하고 있습니다.
             질문 사항이나 궁금한 점이 있거나, 프로젝트 컨트리뷰터와 대화를 나누고 싶으시면 아래 Discord 채팅을 이용해주세요.</p>
            <iframe src='https://discordapp.com/widget?id=392625718682714112&theme=light' width='350' height='500' allowTransparency='true' frameBorder='0' />
          </BodyContainer>
        </main>
      </div>
    );
  }
}

export default CommunityPage;
