// File: TotalLeavesByEmployee.js

import  { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';
import { addEmployees } from './firestoreOperations';

const TotalLeavesByEmployee = () => {
    const [leaveData, setLeaveData] = useState([]);

    useEffect(() => {
        const employeesRef = collection(firestore, 'Employees');
        const unsubscribe = onSnapshot(employeesRef, (snapshot) => {
            const leaveData = snapshot.docs.map((doc) => {
                const { name, leaves_left } = doc.data();
                return { name, total_leaves_taken: 20 - leaves_left };
            });
            setLeaveData(leaveData);
        });

        return () => unsubscribe();
    }, []);

    const handleAddEmployee = async () => {
        try {
            await addEmployees({
                name: 'John Doe',
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
            <h2>Total Leaves Taken by Each Employee</h2>
            <ul>
                {leaveData.map((employee) => (
                    <li key={employee.name}>
                        {employee.name}: {employee.total_leaves_taken} leaves taken
                    </li>
                ))}
            </ul>
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default TotalLeavesByEmployee;
