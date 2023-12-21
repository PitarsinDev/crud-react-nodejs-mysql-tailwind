import { useState } from 'react'
import React from 'react'

import Axios from 'axios'
import axios from 'axios';

function Contect() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);
    const [newWage, setNewWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    const getemployee = () => {
        axios.get('http://localhost:3001/employees').then((response) => {
            setEmployeeList(response.data);
        });
    }

    const addEmployee = () => {
        Axios.post("http://localhost:3001/create", {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        }).then(() => {
          setEmployeeList([
            ...employeeList,
            {
              name: name,
              age: age,
              country: country,
              position: position,
              wage: wage,
            },
          ]);
        });
      };
    
      const updateEmployeeWage = (id) => {
        Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
          (response) => {
            setEmployeeList(
              employeeList.map((val) => {
                return val.id == id
                  ? {
                      id: val.id,
                      name: val.name,
                      country: val.country,
                      age: val.age,
                      position: val.position,
                      wage: newWage,
                    }
                  : val;
              })
            );
          }
        );
      };
    
      const deleteEmployee = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
          setEmployeeList(
            employeeList.filter((val) => {
              return val.id != id;
            })
          );
        });
      };

  return (
    <div className='flex justify-center '>
        <div className='sm:w-9/12 w-11/12'>

            <h1 className='text-3xl text-center p-5'>
                CRUD Nodejs
            </h1>

            <div className='flex justify-center items-center py-2'>
                <form action="">

                        <div className='flex justify-center items-center'>
                            <label 
                            htmlFor="name"
                            className='pr-2'>
                                Name: 
                            </label>
                            <input 
                            type="text" 
                            className='border rounded-full pl-2 w-9/12'
                            placeholder='Enter Name' 
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                            />
                        </div>
                        <br />
                        <div className='flex justify-center items-center'>
                            <label 
                            htmlFor="age"
                            className='pr-2'>
                                Age: 
                            </label>
                            <input 
                            type="number" 
                            className='border rounded-full pl-2 w-9/12'
                            placeholder='Enter Age' 
                            onChange={(event) => {
                                setAge(event.target.value)
                            }}
                            />
                        </div>
                        <br />
                        <div className='flex justify-center items-center'>
                            <label 
                            htmlFor="country"
                            className='pr-2'>
                                Country: 
                            </label>
                            <input 
                            type="text" 
                            className='border rounded-full pl-2 w-9/12'
                            placeholder='Enter Country' 
                            onChange={(event) => {
                                setCountry(event.target.value)
                            }}
                            />
                        </div>
                        <br />
                        <div className='flex justify-center items-center'>
                            <label 
                            htmlFor="position"
                            className='pr-2'>
                                Position: 
                            </label>
                            <input 
                            type="text" 
                            className='border rounded-full pl-2 w-9/12'
                            placeholder='Enter Position' 
                            onChange={(event) => {
                                setPosition(event.target.value)
                            }}
                            />
                        </div>
                        <br />
                        <div className='flex justify-center items-center'>
                            <label 
                            htmlFor="wage"
                            className='pr-2'>
                                Wage: 
                            </label>
                            <input 
                            type="text" 
                            className='border rounded-full pl-2 w-9/12'
                            placeholder='Enter Wage' 
                            onChange={(event) => {
                                setWage(event.target.value)
                            }}
                            />
                        </div>
                        <br />
                    <button 
                    className='bg-indigo-600 text-white rounded-full px-4 py-1 mt-3'
                    onClick={addEmployee}
                    >
                        Add Data
                    </button>
                </form>
            </div>
            
            <hr className='mt-5' />
            <div className=' py-2'>
                <div className='flex justify-center items-center pb-5'>
                    <button className='bg-indigo-600 text-white rounded-full px-4 py-1 mt-3' onClick={getemployee}>
                        Show Data
                    </button>
                </div>

                {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="text-center">
                <p className="text-center">Name<span className='text-indigo-600'> :</span> {val.name}</p>
                <p className="text-center">Age<span className='text-indigo-600'> :</span> {val.age}</p>
                <p className="text-center">Country<span className='text-indigo-600'> :</span> {val.country}</p>
                <p className="text-center">Position<span className='text-indigo-600'> :</span> {val.position}</p>
                <p className="text-center">Wage<span className='text-indigo-600'> :</span> {val.wage}</p>
                <br />
                <p className='text-center text-indigo-600'>Salary Adjustment</p>
                <br />
                <div className="flex justify-center items-center">
                  <input
                    className="border rounded-full pl-2"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder="Money...."
                    onChange={(event) => {
                      setNewWage(event.target.value)
                    }}
                  />
                  <button className="text-red-600 mx-2" onClick={() => {updateEmployeeWage(val.id)}}>Update</button>

                  <button className="text-red-600 mx-2" onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
            </div>

        </div>
    </div>
  )
}

export default Contect