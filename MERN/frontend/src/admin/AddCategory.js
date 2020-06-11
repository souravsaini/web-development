import React, {useState} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {user, token} = isAuthenticated();

  const GoBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-info btn-sm mb-3" to="/admin/dashboard"> Go Back </Link>
      </div>
    )
  }

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  }

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, {name})
    .then(data =>  {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    })
  }

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">Category created successfully </h4>
      )
    }
  }

  const warningMessage = () => {
    if (error) {
      return (
        <h4 className="text-warning">Failed to create category </h4>
      )
    }
  }

  const Form = () => {
    return (
      <form>
        <div className="form-group">
          <p> Enter the category </p>
          <input type="text" className="form-control my-3" onChange={handleChange} value={name} autofocus required />
          <button type="submit" onClick={onSubmit} className="btn btn-outline-info"> Create Category </button>
        </div>
      </form>
    )
  }

  return (
    <Base title="Create a category here" description="Add a new category for new products"
      className="container bg-info p-4">
        <div className="row bg-white rounded" style={{color: "black"}}>
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {Form()} {GoBack()}
          </div>
        </div>
    </Base>

  )
}

export default AddCategory;
