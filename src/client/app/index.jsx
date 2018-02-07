import React from 'react';
import {render} from 'react-dom';

/*class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

render(<App/>, document.getElementById('app'));*/

class StudentRow extends React.Component{
	render(){
		const name = this.props.records.Name;
    const SID = this.props.records.SID;

    return (
      <tr>
        <td>{SID}</td>
        <td>{name}</td>
      </tr>
    );
	}
}

class BranchRow extends React.Component
{
  render(){
    const branch = this.props.branch;
		return(
    <tr>
        <th colSpan="2">
          {branch}
        </th>
    </tr>);
	}
}

class BranchwiseData extends React.Component
{
  render()
  {
  const filterText = this.props.filterText;
	const rows = [];
  let lastBranch = null;
  
  this.props.records.forEach((record)=>
  {
    if(record.Name.toLowerCase().indexOf(filterText.toLowerCase())===-1 && record.SID.indexOf(filterText)===-1)
      {
        return;
      }
    
    if(record.Branch !== lastBranch)
      {
        rows.push(<BranchRow branch={record.Branch} key = {record.Branch}/>);
      }
    rows.push(<StudentRow records = {record} key = {record.SID}/>);
    lastBranch = record.Branch;
  });                                  
		return(
    <table>
        <thead>
          <tr>
            <th>SID</th>
            <th>NAME</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
	render()
  {  
    const filterText = this.props.filterText;
		return(
		<form>
        <input type = "text" placeholder = "Search..." value = {filterText} onChange = {this.handleFilterTextChange}/>
		</form>);
	}
}

class StudentData extends React.Component
{
  
  constructor(props){
    super(props);
    this.state = {
      filterText: ''
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
	render()
  {
		return(
			<div>
			<SearchBar filterText = {this.state.filterText} onFilterTextChange = {this.handleFilterTextChange}/>
			<BranchwiseData records = {this.props.records} filterText = {this.state.filterText}/>
			</div>
			);
	}
}

const data = [
{Branch: 'CSE', SID: '15103085', Name: 'Akhil Singla'},
{Branch: 'CSE', SID: '15103022', Name: 'Pritish'},
{Branch: 'CSE', SID: '15103062', Name: 'Ira'},
{Branch: 'ECE', SID: '15105088', Name: 'Rishabh'},
];

render(
  <StudentData records={data} />,
  document.getElementById('app')
);
