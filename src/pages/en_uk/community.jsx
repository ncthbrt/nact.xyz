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
            language='en_uk'
            siteTitle={config.siteTitle}
            siteDescription={config.siteDescription}
            location={this.props.location}
            logo={config.siteLogo}
          />
          <BodyContainer>
            <h1>Community</h1>
            <p>Nact is developed in the open. Development activities are hosted on <a href='https://github.com/ncthbrt/nact'>github</a>.
            If you have any questions, or just want to say “Hi!”, please visit the discord below: </p>
            <iframe src='https://discordapp.com/widget?id=392625718682714112&theme=light' width='350' height='500' allowTransparency='true' frameBorder='0' />
          </BodyContainer>
        </main>
      </div>
    );
  }
}

export default CommunityPage;
