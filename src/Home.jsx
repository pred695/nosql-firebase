import  { useState } from 'react';
import { addEmployees, addDepartments } from './fireStoreOperations';


const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    department_id: "",
    salary: "",
    age: "",
    leaves_left: "",
    department_name: "",
    no_employees: "",
    head_of_dept: "",
    total_leaves_for_emp: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployees(formData);
      console.log("Employees added successfully!");
      setFormData({
        name: "",
        dob: "",
        department_id: "",
        salary: "",
        age: "",
        leaves_left: "",
        department_name: "",
        no_employees: "",
        head_of_dept: "",
        total_leaves_for_emp: ""
      });
    } catch (err) {
      console.error("Error adding employees:", err);
    }
  };

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartments(formData);
      console.log("Departments added successfully!");
      setFormData({
        name: "",
        dob: "",
        department_id: "",
        salary: "",
        age: "",
        leaves_left: "",
        department_name: "",
        no_employees: "",
        head_of_dept: "",
        total_leaves_for_emp: ""
      });
    } catch (err) {
      console.error("Error adding departments:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleEmployeeSubmit}>
        <h3>Add Employee</h3>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <label>Department ID</label>
        <input type="text" name="department_id" value={formData.department_id} onChange={handleChange} required />
        <label>Salary</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        <label>Leaves Left</label>
        <input type="number" name="leaves_left" value={formData.leaves_left} onChange={handleChange} required />
        <button type="submit">Add Employee</button>
      </form>

      <form onSubmit={handleDepartmentSubmit}>
        <h3>Add Department</h3>
        <label>Department Name</label>
        <input type="text" name="department_name" value={formData.department_name} onChange={handleChange} required />
        <label>Number of Employees</label>
        <input type="number" name="no_employees" value={formData.no_employees} onChange={handleChange} required />
        <label>Head of Department</label>
        <input type="text" name="head_of_dept" value={formData.head_of_dept} onChange={handleChange} required />
        <label>Total Leaves for Employees</label>
        <input type="number" name="total_leaves_for_emp" value={formData.total_leaves_for_emp} onChange={handleChange} required />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default Home;
