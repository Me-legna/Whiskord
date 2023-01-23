import secondary_section_image_2 from '../../images/LandingPage/secondary-section-image-2.svg';

function VoiceChatBanner(){
    return (
        <div className="secondary-section">
            <div className='secondary-section-text'>
                <h2>Where hanging out is easy</h2>
                <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
            </div>
            <img src={secondary_section_image_2} alt="Section 2" />
        </div>
    )
}

export default VoiceChatBanner
