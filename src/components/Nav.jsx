import React from 'react'

import logo from '../assets/images/logo.svg';
import search from '../assets/images/search.svg';
import store from '../assets/images/store.svg';

export default function Nav() {
  return (
    <nav className="nav-wrapper">
        <div className="nav-content">
            <ul className="list-styled">
                <li>
                    <img src={logo} alt="apple-logo" />
                </li>
                <li className="link-styled">Mac</li>
                <li className="link-styled">iPhone</li>
                <li className="link-styled">iPad</li>
                <li className="link-styled">Watch</li>
                <li className="link-styled">AirPods</li>
                <li className="link-styled">Tv & Home </li>
                <li className="link-styled">Entertainment</li>
                <li className="link-styled">Accessories</li>
                <li className="link-styled">Support</li>
                <li className="link-styled">
                <img src={search} alt="search" />
                </li>                
                <li className="link-styled">
                <img src={store} alt="store" />
                </li>                
            </ul>
        </div>
    </nav>
  )
}
