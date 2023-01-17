import secondary_section_image_3 from '../../images/LandingPage/secondary-section-image-3.svg';

function RolesBanner() {
    return (
        <div className="secondary-section">
            <img src={secondary_section_image_3} alt="Section 3" />
            <div className='secondary-section-text'>
                <h2>From few to a fandom</h2>
                <p>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
            </div>
        </div>
    )
}

export default RolesBanner
