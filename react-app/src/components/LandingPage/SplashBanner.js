import splash_section_primary_image_1 from '../../images/LandingPage/splash-section-primary-image-1.svg';
import splash_section_image_2 from '../../images/LandingPage/splash-section-image-2.svg';


function SplashBanner() {
    return (
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
    )
}

export default SplashBanner
