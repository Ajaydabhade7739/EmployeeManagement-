import React, { useEffect, useState } from "react";
import "./EmployeeComponent.css";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate , useParams} from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
     const {id}= useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();

     useEffect(() => {
      if(id){
        getEmployee(id).then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);

        }).catch(error =>{
          console.error(error)
        })
      }
     },[id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email }; 
      e.preventDefault();
      if (id){
        updateEmployee(id,employee).then((response) =>{
          console.log(response.data);
          navigator('/employees');
        } ).catch(error => {
          console.error(error);
        })
      }
      else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator("/employees");
        }).catch(error => {
          console.error(error);
        })
      }
      
      console.log(employee);
     
    }
    e.preventDefault();
    
    console.log(employee);
    createEmployee(employee).then((response) => {
      console.log(response.data);
      navigator("/employees");
    });
  }
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }
  
  function pageTitle () {
  if (id){
    return <h2 className="text-center">Update Employee</h2>
  }
  else {
    return <h2 className="text-center">Add Employee </h2>
  }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card  w-full">
          {
            pageTitle()
          }
          <div className="cardbody">
            <form action="">
              <div className="form-group mb-2">
                <label htmlFor="" className="form-lable">
                  {" "}
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Employee First Name"
                  value={firstName}
                  className={`from control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && <div className="invalid-feedback"> {errors.firstName} </div>}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-lable">
                  {" "}
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Employee Last Name"
                  value={lastName}
                  className={`from control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && <div className="invalid-feedback"> {errors.lastName} </div>}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-lable">
                  {" "}
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Employee Email"
                  value={email}
                  className={`from control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                 {errors.email && <div className="invalid-feedback"> {errors.email} </div>}
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
