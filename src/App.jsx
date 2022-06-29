import './App.css';
import React from "react";

function TextInput(props) {
  return <input value={props.this.state.value} onChange={props.this.handleChange} type="text" autoFocus={true}/>
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
    this.state = {value: '', result: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState( {
      value: event.target.value
    })
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      value: ''
    })
    
    const SERVER_URL = 'https://api.genderize.io';
    const firstName = this.state.value;
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
    return (
     <div>
       <form onSubmit={this.handleSubmit}>
         <TextInput this={this}/>
         <Button/>
       </form>
       <Result result={this.state.result}/>
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
