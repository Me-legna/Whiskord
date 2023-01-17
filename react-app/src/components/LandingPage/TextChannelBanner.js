import secondary_section_image_1 from '../../images/LandingPage/secondary-section-image-1.svg';

function TextChannelBanner() {

    return (
        <div className="secondary-section">
            <img src={secondary_section_image_1} alt="Section 1" />
            <div className='secondary-section-text'>
                <h2>Create an invite-only place where you belong</h2>
                <p>Whiskord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
            </div>
        </div>
    )
}

export default TextChannelBanner
