import logo from './calender.jpg';
import { useState } from "react";
import { Link } from "react-router-dom";
const Forgotpassword = () => {
    var [email,setEmail]=useState('');

    var forgotAction=(e,email)=>{
        e.preventDefault();
        if(email!=='')
        {
            

        }
    }

    return ( 

        <section className="vh-100" style={{backgroundColor:'#2b3452'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius:"1rem"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={logo}
                      alt="login form" className="img-fluid" style={{borderRadius:"1rem 0 0 1rem",height:"100%"}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                    <div className="d-flex align-items-center mb-3 pb-1">
                          
                          <img src={logo} alt={'logo'} style={{width:"50px",height:"50px"}}/>
                          <h2 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Opps this feature is not yet ready, for now please contact administrator...</h2>
                        </div>
                        <Link to={'/'} className="small text-muted"><button type="button" className="btn btn-dark btn-md btn-block">Back Home</button></Link>
                        <span class="badge badge-pill badge-danger">Administrator Details: futurekgaphola@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     );
}
 
export default Forgotpassword;