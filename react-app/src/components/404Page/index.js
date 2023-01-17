import { Link } from 'react-router-dom'
import './404.css'

function NotFoundPage () {

    return (
        <div className='404'>
            <h1>404 Page Not Found 😥</h1>
            <Link to='/'>I wanna go home!</Link>
        </div>
    )
}

export default NotFoundPage
