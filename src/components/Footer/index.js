import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

const Footer = ({ author, title }) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
          <p>
            Créé par
            <a
              className="text-green ml-2"
              href="https://github.com/ddeschenes"
              target="_blank"
            >
              ddeschenes
            </a>
            <div>papa & fan de wknd radio 91.9 fm !</div>
          </p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
