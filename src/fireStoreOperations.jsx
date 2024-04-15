// File: firestoreOperations.js

import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const addEmployees = async (formData) => {
    try {
        const employeesRef = collection(firestore, 'Employees');
        await addDoc(employeesRef, {
            name: formData.name,
            dob: formData.dob,
            department_id: formData.department_id,
            salary: formData.salary,
            age: formData.age,
            leaves_left: formData.leaves_left
        });
        console.log("Employee added successfully!");
    } catch (err) {
        console.error("Error adding employee:", err);
        throw err; // Re-throw error for error handling in the calling component
    }
};

export const addDepartments = async (formData) => {
    try {
        const departmentsRef = collection(firestore, 'Departments');
        await addDoc(departmentsRef, {
            department_name: formData.department_name,
            no_employees: formData.no_employees,
            head_of_dept: formData.head_of_dept,
            total_leaves_for_emp: formData.total_leaves_for_emp
        });
        console.log("Department added successfully!");
    } catch (err) {
        console.error("Error adding department:", err);
        throw err; // Re-throw error for error handling in the calling component
    }
};
