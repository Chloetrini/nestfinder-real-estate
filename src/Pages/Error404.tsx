
import { Link } from "react-router-dom"

const Error404 = () => {
  return (
    <div>
        <h1>ERROR 404</h1>
        <p>Page not here</p>
        <Link to="/">
        <button>Back to home</button>
        </Link>
    </div>
  )
}

export default Error404