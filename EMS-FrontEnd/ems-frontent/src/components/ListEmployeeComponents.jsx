import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponents = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  function fetchEmployees() {
    listEmployees()
    .then((response) => {
      setEmployees(response.data);
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
    });

  }

  function addNewEmployee() {
    navigator("/add-employee");
  }
  function updateEmployee(id) {
    console.log(`Updating employee with ID: ${id}`);
    navigator (`/edit-employee/${id}`)
  }

  function removeEmployee(id){
     deleteEmployee(id).then((response) => {
      console.log("Delete response:", response); 
      fetchEmployees();
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <h2 className="text-center">List Of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <div
        className="table-container"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <table
          className="table table-hover table-bordered"
          style={{ width:"100%" }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <tr>
              <th>Employee Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                    <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)}
                      style={{marginLeft:'10px'}}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponents;
