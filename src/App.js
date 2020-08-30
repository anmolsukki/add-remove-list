import React from 'react';
import "./App.css"

class App extends React.Component {
  state = {
    selectValue: "",
    baseRate: "",
    tableData: []
  }

  handleDropdownChange = (e) => {
    this.setState({ selectValue : e.target.value });
  }

  updateRateInput = (key, value) => {
    this.setState({ [key]: value });
  }

  submitForm = async (e) => {
    e.preventDefault();
    const row = { select : this.state.selectValue, baseRate : this.state.baseRate };
    await this.setState({
        tableData : [...this.state.tableData, row]
    })
  }

  deleteRateItem = async (id) => {
    let tableData = [...this.state.tableData];
    tableData.splice(id, 1);
    await this.setState({ tableData }); 
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitForm}>
          <select className="form-class" onChange={this.handleDropdownChange}>
            <option defaultValue="">Skype</option>
            <option value="Java">Java</option>
            <option value="NodeJs">NodeJs</option>
            <option value="HTML">HTML</option>
            <option value="PHP">PHP</option>
          </select>
          <input type="text" placeholder="$20" className="form-class" value={this.state.baseRate} onChange={(e) => this.updateRateInput("baseRate", e.target.value)} />
          <button type="submit" className="form-class">Add</button>
        </form>
        <table className="table-class">
          <thead>
            <tr>
              <th>No.</th>
              <th>Skill</th>
              <th>Base Hourly Rate(USD)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((item, index) => {
              return ( 
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.select}</td>
                  <td>${item.baseRate}</td>
                  <td><button onClick={() => this.deleteRateItem(index)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
