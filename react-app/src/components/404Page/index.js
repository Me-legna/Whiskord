import { Link } from "react-router-dom";
import "./404.css";

function NotFoundPage() {
  return (
    // <div classNameName='404'>
    //     <h1>404 Page Not Found 😥</h1>
    //     <Link to='/'>I wanna go home!</Link>
    // </div>
    <div className="page_404">
      <div className="container">
        <div className="row">
          <div className="text-center">
            <div className="animation_bg">
              <h1 className="error-title text-center ">404</h1>
            </div>

            <div className="message_box_404">
              <h3 className="h2">We're sorry!</h3>

              <p>
                Looks like he was trying to figure out the wires! We're on it,
                hang tight!
              </p>
              <Link to="/" className="link_404">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
