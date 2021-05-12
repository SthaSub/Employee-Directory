import React, { Component } from 'react';
import API from '../../utils/API';
import Header from '../Header';
import Search from '../Search';
import Table from '../Table';

class Container extends Component {
  state = {
    search: "",
    ascendingOrder: true,
    employees: [],
    filteredEmployees: [],
    nonFilteredEmployees: []
  };

  componentDidMount() {
    API.getUsers().then(res => {
      let getAllEmployees = {emps:res.data.results.map(staff => ({
        name: staff.name.first + " " + staff.name.last,
        image: staff.picture.large,
        email: staff.email,
        phone: staff.phone,
        dob: this.dateFormatter(staff.dob.date)
      }))};
      this.setState(
        {
          employees: getAllEmployees.emps,
          nonFilteredEmployees: getAllEmployees.emps
        }
      );

    }).catch(err => console.error(err));
  }

  sortBy = () => {
    let sortedEmployees = [];
    if (this.state.ascendingOrder) {
      sortedEmployees = this.state.employees.sort((a, b) => {
        return this.comparator(a,b);
      })
    } else {
      sortedEmployees = this.state.employees.sort((a, b) => {
        return this.comparator(b,a);
      })
    }

    this.setState({
      ascendingOrder: !this.state.ascendingOrder,
      employees: sortedEmployees

    })
  }

  comparator = (x, y) => {
    let nameFirst = x["name"].toUpperCase();
    let nameSecond = y["name"].toUpperCase();
    if (nameFirst > nameSecond)
      return 1
    else if (nameFirst === nameSecond)
      return 0
    return -1
  }
  

  handleInputChange = (event) => {
    event.preventDefault();
    let employeeFiltered = (event.target.value.length !== 0) ?
      this.state.employees.filter(emp => emp.name.includes(event.target.value)) :
      this.state.nonFilteredEmployees;
      this.setState({
      search: event.target.value,
      employees: employeeFiltered
    });
    
  }


  dateFormatter = (date) => {
    const d = new Date(Date.parse(date));
    return (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
  }


  render() {
    return (<div>
      <Header />
      <Search
        value={this.state.search}
        handleInputChange={this.handleInputChange}
      />
      <div className="container mt-4">
        <Table
          sortBy={this.sortBy}
          employees={this.state.employees}
        />
      </div>
    </div>
    );
  }
}

export default Container;