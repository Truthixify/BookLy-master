import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <div>
      <div className="footerLogo">
        <h1>BookLy</h1>
      </div>
      <p>Copyright BookLy 2022</p>
      <div className="footerSocial">
        <a href=""><i className="fa-brands fa-facebook-square"></i></a>
        <a href=""><i className="fa-brands fa-instagram-square"></i></a>
        <a href=""><i className="fa-brands fa-twitter-square"></i></a>
        <a href=""><i className="fa-brands fa-pinterest-square"></i></a>
      </div>
      </div>
    </div>
  )
}
