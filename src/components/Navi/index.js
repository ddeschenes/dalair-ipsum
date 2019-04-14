import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

class Navi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary">
        <div className="container justify-content-center">
          <Link className="text-center" to="/">
            <h1 className="navbar-brand mb-0">{title}</h1>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Navi
