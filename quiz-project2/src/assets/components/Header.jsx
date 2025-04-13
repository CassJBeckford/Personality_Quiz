import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <div>
            <h1>Which Element Are You</h1>
            <p>based on completely random things</p>
            <Link to="/">Home</Link>
            <Link to="/quiz">Quiz</Link>
        </div>
    )
}