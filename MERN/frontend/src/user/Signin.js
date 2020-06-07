import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading:true })
    signin({email, password})
    .then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading:false})
      } else {
        authenticate(data, () => {
          setValues({ ...values, didRedirect: true })
        })
      }
    })
    .catch(console.log("Signin failed"))
  }

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    //if (isAuthenticated()) {
    //  return <Redirect to="/" />
    //}
  }

  const loadingMessage = () => {
    return (
      loading &&  (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
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

  const SigninForm = () => {

    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-left">
          <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input onChange={handleChange("email")} type="email" class="form-control" value={email} />
          </div>
          <div class="form-group">
            <label for="pwd">Password</label>
            <input onChange={handleChange("password")} type="password" class="form-control" value={password}/>
          </div>
          <button onClick={onSubmit} type="submit" class="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <Base title="Sign In Page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {SigninForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signin;
