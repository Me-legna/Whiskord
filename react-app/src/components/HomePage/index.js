import React from 'react';
import './HomePage.css';

import splash_section_primary_image_1 from '../../images/HomePage/splash-section-primary-image-1.svg';
import splash_section_image_2 from '../../images/HomePage/splash-section-image-2.svg';
import splash_section_background_image from '../../images/HomePage/splash-section-background-clouds-and-stars.svg';
import secondary_section_image_1 from '../../images/HomePage/secondary-section-image-1.svg';
import secondary_section_image_2 from '../../images/HomePage/secondary-section-image-2.svg';
import secondary_section_image_3 from '../../images/HomePage/secondary-section-image-3.svg';
import secondary_section_image_4 from '../../images/HomePage/secondary-section-image-4.svg';

function Homepage() {
  return (
    <div>
      <div className="splash-banner">
        <h1>IMAGINE A PLACE...</h1>
        <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
        <button>Open Whiskord in your browser</button>
        <div className='splash-images-container'>
            <img src={splash_section_primary_image_1} alt='Splash Image' />
            <img src={splash_section_image_2} alt='Splash Image 2' />
            {/* <img src={splash_section_background_image} alt='Splash Background Image' /> */}
        </div>
      </div>
      <div className="secondary-section">
        <img src={secondary_section_image_1} alt="Section 1" />
        <div className='secondary-section-text'>
            <h2>Create an invite-only place where you belong</h2>
            <p>Whiskord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
        </div>
      </div>
      <div className="secondary-section">
        <div className='secondary-section-text'>
            <h2>Where hanging out is easy</h2>
            <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
        </div>
        <img src={secondary_section_image_2} alt="Section 2" />
        </div>

        <div className="secondary-section">
        <img src={secondary_section_image_3} alt="Section 3" />
        <div className='secondary-section-text'>
            <h2>From few to a fandom</h2>
            <p>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
        </div>
        </div>

    </div>
  );
}

export default Homepage;
