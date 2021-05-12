import React from 'react';
import './Style.css';
function Table(props) {

    return (
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr className="headTable">
                    <th>Image</th>
                    <th>
                        <span  onClick={() => props.sortBy('name')}>
                             Name
                        </span>
                    </th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                </tr>
            </thead>
            <tbody>
                {props.employees.map((user, index) =>
                    <tr key={index}>
                        <td>
                            <img src={user.image} alt="profile" />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td><a href="#">{user.email} </a></td>
                        <td>{user.dob}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table