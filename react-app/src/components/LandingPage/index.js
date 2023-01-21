import React from 'react';
import './LandingPage.css';

import NavBar from './Navigation/NavBar';
import SplashBanner from './SplashBanner';
import TextChannelBanner from './TextChannelBanner';
import VoiceChatBanner from './VoiceChatBanner';
import RolesBanner from './RolesBanner';
import Footer from './Footer';

function LandingPage() {
  return (
    <div>
      <div className='splash-background-container'>
        <NavBar />
        <SplashBanner />
      </div>

      <div>
        <div>
          <TextChannelBanner />
          <VoiceChatBanner />
          <RolesBanner />
        </div>
      </div>

      <div className='footer-container'>
        <Footer/>
      </div>
    </div>
  );
}

export default LandingPage;
