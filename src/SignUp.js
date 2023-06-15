import logo from './calender.jpg';
import { Form, Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
    var [email,setEmail]=useState('');
    var [pass,setpassword]=useState('');
    var [Name,setname]=useState('');
    var [surname,setsurname]=useState('');
    
    return ( 

        <section className="vh-100" style={{backgroundColor:'#2b3452'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius:"1rem"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={logo}
                      alt="register form" className="img-fluid" style={{borderRadius:"1rem 0 0 1rem"}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <Form method="post" action="/">

                        <div className="d-flex align-items-center mb-3 pb-1">
                        <img src={logo} alt={'logo'} style={{width:"50px",height:"50px"}}/>
                          <span className="h1 fw-bold mb-0">Task Monitor</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Sign up for an account</h5>

                        <div className="form-outline mb-4">
                          <input
                          onChange={(e)=>{setEmail(e.target.value)}}
                           type="email"
                           required
                            id="form2Example17"
                            name="uemail"
                             className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                        </div>
                        

                        <div className="form-outline mb-4">
                          <input
                          onChange={(e)=>{setpassword(e.target.value)}}
                           type="password"
                           name="upass"
                           required
                            id="form2Example27"
                             className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>
                        <p>{pass}</p>

                        <div className="form-outline mb-4">
                          <input
                          onChange={(e)=>{setname(e.target.value)}}
                           type="text"
                           required
                           name="uname"
                            id="form2E"
                             className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2E">Name</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                          onChange={(e)=>{setsurname(e.target.value)}}
                           type="text"
                           required
                           name="usurname"
                            id="form2Ex"
                             className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Ex">Surname</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                           type='submit' className="btn btn-dark btn-lg btn-block">Signup</button>
                        </div>

                        <Link to={'/'} className="small text-muted">Back to login</Link>

                      </Form>
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
 
export default SignUp;