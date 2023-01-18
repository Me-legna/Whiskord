import { Link } from "react-router-dom";
import "./404.css";

function NotFoundPage() {
  return (
    // <div className='404'>
    //     <h1>404 Page Not Found 😥</h1>
    //     <Link to='/'>I wanna go home!</Link>
    // </div>
    <div class="page_404">
      <div class="container">
        <div class="row">
          <div class="text-center">
            <div class="animation_bg">
              <h1 class="error-title text-center ">404</h1>
            </div>

            <div class="message_box_404">
              <h3 class="h2">We're sorry!</h3>

              <p>
                Looks like he was trying to figure out the wires! We're on it,
                hang tight!
              </p>
              <Link to="/" class="link_404">
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
