// File: TopEmployees.js

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';
import { addEmployees } from './firestoreOperations';

const TopEmployees = () => {
    const [topEmployees, setTopEmployees] = useState([]);

    useEffect(() => {
        const employeesRef = collection(firestore, 'Employees');
        const q = query(employeesRef, orderBy('salary', 'desc'), limit(5));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const topEmployeesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTopEmployees(topEmployeesData);
        });

        return () => unsubscribe();
    }, []);

    const handleAddEmployee = async () => {
        try {
            await addEmployees({
                name: 'New Employee',
                dob: '1990-01-01',
                department_id: 'dept1',
                salary: 50000,
                age: 30,
                leaves_left: 10
            });
            console.log("Employee added successfully!");
        } catch (err) {
            console.error("Error adding employee:", err);
        }
    };

    return (
        <div>
            <h2>Top Five Employees Based on Salary</h2>
            <ul>
                {topEmployees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - Salary: {employee.salary}
                    </li>
                ))}
            </ul>
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default TopEmployees;
