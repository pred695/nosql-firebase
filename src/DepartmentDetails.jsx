// File: DepartmentDetails.js

import  { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';
import { addDepartments } from './firestoreOperations';

const DepartmentDetails = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const departmentsRef = collection(firestore, 'Departments');
        const unsubscribe = onSnapshot(departmentsRef, (snapshot) => {
            const updatedDepartments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDepartments(updatedDepartments);
        });

        return () => unsubscribe();
    }, []);

    const handleAddDepartment = async () => {
        try {
            await addDepartments({
                department_name: 'New Department',
                no_employees: 0,
                head_of_dept: 'New Head',
                total_leaves_for_emp: 0
            });
            console.log("Department added successfully!");
        } catch (err) {
            console.error("Error adding department:", err);
        }
    };

    return (
        <div>
            <h2>Department Details</h2>
            <ul>
                {departments.map((department) => (
                    <li key={department.id}>
                        {department.department_name}: {department.no_employees} employees
                    </li>
                ))}
            </ul>
            <button onClick={handleAddDepartment}>Add Department</button>
        </div>
    );
};

export default DepartmentDetails;
