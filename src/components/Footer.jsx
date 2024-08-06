import { Link } from 'react-router-dom'
import '../css/components/Footer.scss'

export default function Footer() {
    return (
        <footer>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li>Topics</li>
                <li>Post</li>
                <li><Link to={'/account'}>Account</Link></li>
            </ul>
        </footer>
    )
}