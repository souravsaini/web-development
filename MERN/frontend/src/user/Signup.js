import React, { useState } from "react";
import {Link} from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";

const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false});
    signup({name, email, password})
    .then(data => {
      console.log(data)
      if(data.errors) {
        setValues({ ...values, error: data.errors, success: false})
      } else {
        setValues({ ...values, name: "", email: "", password: "", error: "", success: true})
      }
    })
    .catch(console.log("Error in signup"))
  }

  const SignupForm = () => {
      return (
        <div className="row">
          <div className="col-sm-6 offset-sm-3 text-left">
            <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" onChange={handleChange("name")} value={name} class="form-control" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" onChange={handleChange("email")} value={email} class="form-control" />
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input type="password" onChange={handleChange("password")} value={password} class="form-control" />
            </div>
            <button onClick={onSubmit} type="submit" class="btn btn-success btn-block">Submit</button>
            </form>
          </div>
        </div>
      )
  }

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{display: success ? "" : "none"}}>
            New account is created successfully. Please <Link to="/signin"> Login Here</Link>
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Base title="Sign Up Page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {SignupForm()}
      <p className="text-white text-center"> {JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signup;
