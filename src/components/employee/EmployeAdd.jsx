import React, {useState} from "react";

import { Button } from 'react-bootstrap'

const EmployeeAdd = ({employees, findAllEmployees, employee, setEmployee}) => {

    const [formData, updateFormData] = useState(employee);

    const handleChange = (e) => {
        const name = [e.target.name];

        employee[name] = e.target.value.trim();

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };


    const addEmpleado = e => {
        e.preventDefault();

        fetch("http://localhost:8080/employee/save",
            {method: 'POST', body: JSON.stringify(formData),  headers:{'Content-Type': 'application/json'}}
        )
            .then(response => response.json())
            .catch(error => console.log(error))
            .then(response => {

                findAllEmployees([
                    ...employees,
                    response
                ]);

                console.log('El empleado fue guardado con exito...');

                return response;
            })
    }

    const updateEmpleado = e => {
        e.preventDefault();

        fetch("http://localhost:8080/employee/update",
            {method: 'PUT', body: JSON.stringify(employee),  headers:{'Content-Type': 'application/json'}}
        )
            .then(response => response.json())
            .catch(error => console.log(error))
            .then(response => {

                findAllEmployees([
                    ...employees
                ]);

                console.log('El empleado fue actualizado con exito...');

                handleReset();

                return response;
            })
    }

    const handleReset = () => {
        setEmployee({})
    };

    return (
        <form name="empleadoForm" id="create-course-form">
            <p>
                <label>
                    <input type="text" name="id" defaultValue={employee.id} readOnly/>
                </label>
            </p>
            <p>
                <label>
                    Número de empleado:
                    <input type="text" name="noEmpleado" onChange={handleChange} defaultValue={employee.noEmpleado}/>
                </label>
            </p>
            <p>
                <label>
                    Nombre:
                    <input type="text" name="nombre" onChange={handleChange} defaultValue={employee.nombre}/>
                </label>
            </p>
            <p>
                <label>
                    Sueldo:
                    <input type="text" name="sueldo" onChange={handleChange} defaultValue={employee.sueldo}/>
                </label>
            </p>
            <p>
                <label>
                    Empresa:
                    <input type="text" name="empresa" onChange={handleChange} defaultValue={employee.empresa}/>
                </label>
            </p>
            { employee.id === undefined
                ?
                (<Button type="button" value="Guardar" onClick={addEmpleado}>Guardar</Button>)
                :
                (<Button type="button" value="Actualizar" onClick={updateEmpleado}>Actualizar</Button>)
            }
            &nbsp;
            { employee.id !== undefined ? (<Button variant="secondary" value="limpiar" onClick={() => handleReset()}>Limpiar</Button>) : (<p></p>)}
        </form>
    )
}

export default EmployeeAdd;