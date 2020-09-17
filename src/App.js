import React, { Fragment, useState, useEffect } from 'react';

import Employee from "./components/employee/Employee";


import './App.css';

function App() {

    const getEmployees = async () => {

        const employeesFetch = await fetch('http://localhost:8080/employee/all');

        return await employeesFetch.json();
    };

    const [employees, findAllEmployees] = useState([])

    useEffect( () => {

        getEmployees().then(response => findAllEmployees(response))
    }, []);

    return (
        <Fragment>
            <Employee
                employees={employees}
                findAllEmployees={findAllEmployees}
            />
        </Fragment>
    );
}

export default App;
