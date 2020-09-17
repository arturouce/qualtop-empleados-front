import React, {useState} from "react";
import EmployeeAdd from "./EmployeAdd";

import { Container, Button, Table } from 'react-bootstrap';

const Employee = ({employees, findAllEmployees}) => {

    const deleteEmployee = (employee) => {

        fetch(`http://localhost:8080/employee/delete?id=${employee.id}`,
            {method: 'DELETE', headers:{'Content-Type': 'application/json'}}
            )
            .then(response => response.json())
            .catch(error => console.log(error))
            .then(response => {

                const employeeList = employees.filter(emp => emp.id !== employee.id);

                findAllEmployees(employeeList);

                console.log('El empleado ' + response.id + ' fue eliminado con exito...');

                return response;
            })
    }

    const [employee, setEmployee] = useState({});


    const updateEmployee = (emp) => {
        setEmployee(emp);

        console.log(employee);
    }

    return (<Container>

        <h1>CRUD de Empleados Qualtop</h1>

        <EmployeeAdd
            employees={employees}
            findAllEmployees={findAllEmployees}
            employee={employee}
            setEmployee={setEmployee}
        />

        <Table>
            <thead>
            <tr>
                <th>No. Empleado</th>
                <th>Nombre</th>
                <th>Sueldo</th>
                <th>Empresa</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {employees.length === 0
                ?
                <tr>
                    <td colSpan="5">
                        No se encontraron empleados
                    </td>
                </tr>
                :
                employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.noEmpleado}</td>
                        <td>{employee.nombre}</td>
                        <td>{employee.sueldo}</td>
                        <td>{employee.empresa}</td>
                        <td>
                            <Button variant="dark" onClick={() => updateEmployee(employee)}>Editar</Button>&nbsp;
                            <Button variant="danger" onClick={() => deleteEmployee(employee)}>Eliminar</Button>
                        </td>
                    </tr>
                ))

            }
            </tbody>
        </Table>
    </Container>);
};

export default Employee;