import { useHistory } from 'react-router-dom';
import splash_section_primary_image_1 from '../../images/LandingPage/splash-section-primary-image-1.svg';
import splash_section_image_2 from '../../images/LandingPage/splash-section-image-2.svg';
import splash_section_background_image from '../../images/LandingPage/splash-section-background-clouds-and-stars.svg';


function SplashBanner() {
    const history = useHistory();

    return (
        <div className="splash-banner">
            <h1> IMAGINE A PLACE...</h1>
            <p style={{lineHeight:'30px'}}>...where you can belong to a school club, a gaming group, or a worldwide art community.<br></br>
                Where just you and a handful of friends can spend time together.
                A place that makes it easy <br></br>
                to talk every day and hang out more often.</p>
            <button onClick={() => history.push('/home')}>Open Whiskord in your browser</button>
            <div className='splash-images-container'>
                {/* <div className='splash-img-one'> */}
                    <img src={splash_section_primary_image_1} alt='Splash Image' />
                {/* </div> */}
                {/* <div className='splash-images-spacer'> */}
                    &nbsp;
                {/* </div> */}
                {/* <div className='splash-img-two'> */}
                    <img src={splash_section_image_2} alt='Splash Image 2' />
                {/* </div> */}
                {/* <img src={splash_section_background_image} alt='Splash Background Image' /> */}
            </div>
        </div>
    )
}

export default SplashBanner
