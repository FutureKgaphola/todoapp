import { Link} from "react-router-dom";
import { redirect } from 'react-router-dom';
import logo from '../calender.jpg';
import { useState } from "react";

const Login = () => {
    var [email,setEmail]=useState('');
    var [pass,setpassword]=useState('');
    var [erroremail,seterroremail]=useState('');
    var [errorpass,seterrorpass]=useState('');
    var [invalidacc,setinvalidacc]=useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      let found=false;
      let userDataKey;
      let userDataName;
      if(pass.trim().length<1)
      {
        seterrorpass('Please input a valid pasword length of more charecters.');
      }else{seterrorpass('')}
      var re = /\S+@\S+\.\S+/;
      if(email.trim().length<1 || re.test(email.trim())===false)
      {
        seterroremail('Please input a valid email.');
      }else{seterroremail('')}

      if(erroremail==='' && errorpass==='')
      {
        fetch(`http://localhost:4000/users/`)
        .then((resp)=>{
          return resp.json();
        }).then((resp)=>{
          if(Object.keys(resp).length===0)
          {
            setinvalidacc('invalid login details');
          }else{
            for (let i = 0; i < resp.length; i++) {
              if(resp[i].email===email && resp[i].pass===pass)
                  {
                      found=true;
                      userDataKey=resp[i].id;
                      userDataName=resp[i].name;
                      console.log(found);
                      resp=null;
                      break; // Break out of the loop
                  }
              }
            
              if(found===false)
                {
                  setinvalidacc('invalid login details');
                }else{
                  sessionStorage.setItem("details",userDataKey);
                  sessionStorage.setItem("uname",userDataName);
                  window.location.href = "/dashboard";
                }
          }
        }).catch((error)=>{
          setinvalidacc("Opps!.."+error);
        })
      }
      
    };
  
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
                          <span className="h1 fw-bold mb-0">Task Monitor</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Sign into your account</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                              <input 
                              onChange={(e)=>{setEmail(e.target.value)}}
                              type="email"
                              required
                              name="editemail"
                              id="formemail" className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="formemail">Email address</label>
                            </div>
                            
                            <div className="form-outline mb-4">
                              <input
                              onChange={(e)=>{setpassword(e.target.value)}}
                              type="password"
                              required
                              name="editpass"
                              id="formpassword" className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="formpassword">Password</label>
                            </div>
                            
                            <div className="pt-1 mb-4">
                              <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
                            </div>

                        </form>
                        {erroremail && <p>{erroremail}</p>}
                        {errorpass && <p>{errorpass}</p>}
                        {invalidacc && <p>{invalidacc}</p>}

                        <Link className="small text-muted" to={'/Forgotpassword'}>Forgot password?</Link>
                        <p className="mb-5 pb-lg-2" style={{color:"#393f81"}}>Don't have an account? <Link to={'/SignUp'}
                            style={{color:"#393f81"}}>Register here</Link></p>

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
 
export default Login;