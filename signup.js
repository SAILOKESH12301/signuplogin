import React,{ useState } from 'react';
import axios from 'axios';

function Signup (){

    const[note,setNote]=useState({
        fullname:"",
        email:"",
        password:"",
        confirmpassword:"",
        role:"selectyourrole",
        fullnameerror:false,
        emailerror:false,
        passworderror:false,
        confirmpassworderror:false,
        error:"",
        

    })
    

    function validateForm(){
        const fullname=note.fullname;
        const email=note.email;
        const password=note.password;
        const confirmpassword=note.confirmpassword;
       

        if(fullname){
            setNote((prevstate) =>{return{...prevstate,fullnameerror:false}});
        }else{
            setNote((prevstate) =>{return{...prevstate,fullnameerror:true}});
        }

        if(password){
            setNote((prevstate) =>{return{...prevstate,passworderror:false}});
        }else{
            setNote((prevstate) =>{return{...prevstate,passworderror:true}});
        }

        if(email){
            setNote((prevstate) =>{return{...prevstate,emailerror:false}});
        }else{
            setNote((prevstate) =>{return{...prevstate,emailerror:true}});
        }
        
        if(confirmpassword){
            setNote((prevstate) =>{return{...prevstate,confirmpassworderror:false}});
        }else{
            setNote((prevstate) =>{return{...prevstate,confirmpassworderror:true}});
        }
        
        var signUpFormData={
            fullname:note.fullname,
            email:note.email,
            password:note.password,
            confirmpassword:note.confirmpassword,
            role:note.role
        }

        console.log(".....signUpFormData....",signUpFormData);

        axios.post('http://localhost:3001/signup', signUpFormData)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
       
       
    }

    function onChangeInput(event){
        const name=event.target.name;
        const value=event.target.value;
        
        setNote(prevNote => {
            return{
                ...prevNote,[name]:value
            }
        })
       
    }

    function checkValidation(event){
        const name=event.target.name;
        const value=event.target.value;
        
        setNote(prevNote => {
            return{
                ...prevNote,[name]:value
            }
        })
        const password=note.password;
       if(password !== value){
        setNote((prevstate) =>{return{...prevstate,error:"Those passwords didn't match"}});
       }else{
        setNote((prevstate) =>{return{...prevstate,error:""}}); 
       }
       
    }

    return(
        <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h1>Welcome</h1>
                        
                        
                        
                    </div>
                    <div className="col-md-9 register-right">
                        
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Member Signup Form</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="fullname" style={{border:(note.fullnameerror)?"1px solid red":""}} value={note.fullname} placeholder="Full Name *"  onChange={onChangeInput} />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="email" style={{border:(note.emailerror)?"1px solid red":""}} value={note.email} placeholder="Email *"   onChange={onChangeInput} />
                                        </div>
                                        <div className="form-group" >
                                            <select className="form-control" name="role" value={note.role} onChange={onChangeInput}  >
                                                <option className="hidden"  selected disabled value="selectyourrole" >Select your role</option>
                                                <option value="manager">Manager</option>
                                                <option value="developer">Developer</option>
                                            </select>
                                        </div>
                                        
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" style={{border:(note.passworderror)?"1px solid red":""}} value={note.password} placeholder="Password *"  onChange={onChangeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="confirmpassword" style={{border:(note.confirmpassworderror)?"1px solid red":""}} value={note.confirmpassword}  placeholder="Confirm Password *"  onChange={checkValidation} />
                                        </div>
                                        <div>{note.error}</div>
                                        
                                        <input type="submit" className="btnRegister"  value="Signup" onClick={validateForm}/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
    )
}

export default Signup;