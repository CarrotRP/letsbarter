import TextLogo from './TextLogo';
import './Header.css';
import { Link } from 'react-router';

export default function Header(){
    return(
        <header>
            <Link to=""><TextLogo/></Link>
            <span className="right-head">
                <Link to='/signup'><button className='signup'>SIGN UP</button></Link>
                <Link to='/login'><button className='login'>LOGIN</button></Link>
            </span>
        </header>
    );
}