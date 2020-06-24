import React from 'react';
import Logo from '../../Assets/logo.png'
import "./style.css" 


function Footer(){
    return (
      <>
        <div className="container">
            <div className="row flex-center text-center footer">
              <div className="col-lg-12">
                <div>
                  <img src={Logo} alt=""/>
                </div>
                <span>Contraktor 2020.</span>
              </div>
            </div>
          </div>
      </>
      
    );
  }
export default Footer;