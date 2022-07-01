import './App.css';
import React from "react";

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    this.props.onHandleChange(e.target.value)
  }
  
  render() {
    const firstName = this.props.firstName
    return <input value={firstName} onChange={this.handleChange} type="text" autoFocus={true}/>
  }
}

function Button() {
  return <button type="submit">getGender</button>
}

function Result(props) {
  return <div>{props.result}</div>
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {firstName: '', result: ''};
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this)
  }
  
  changeValue(firstName){
    this.setState({
      firstName: firstName
    })
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      firstName: ''
    })
    
    const SERVER_URL = 'https://api.genderize.io';
    const firstName = this.state.firstName;
    const url = `${SERVER_URL}?name=${firstName}`;
    
    const response = await fetch(url);
    const result = await response.json();
    this.showResult(result);
  }
  
  showResult(user) {
    this.setState(() => {
      if (user.name.length < 3) {
        return {result: 'Error'};
      }
      return {result: `${user.name} - ${user.gender}`};
      
      //  todo: redone error output
    });
  }
  
  render() {
    const firstName = this.state.firstName;
    const result = this.state.result;
    return (
     <div>
       <form onSubmit={this.handleSubmit}>
         <TextInput firstName={firstName} onHandleChange={this.changeValue}/>
         <Button/>
       </form>
       <Result result={result}/>
     </div>
    )
  }
}

function App() {
  return (
   <div className="App">
     <Main/>
   </div>
  )
}

export default App;
