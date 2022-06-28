import './App.css';
import React from "react";

function TextInput() {
  return (
   <input type="text" name="gender" id="input" autoFocus={true}/>
  )
}

function Button() {
  return (
   <button type="submit" id="button">getGender</button>
  )
}

function Result(props) {
  return (
   <div>{props.result}</div>
  )
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: null}
    this.saveName = this.saveName.bind(this);
  }
  
  saveName() {
    this.setState(() => {
      return {name: document.getElementById('input').value};
    })
  }
  
  handleEnterEvent(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      this.sendRequest();
    }
  }
  
  handleClickEvent(e) {
    e.preventDefault();
    
    this.sendRequest();
  }
  
  async sendRequest() {
    const SERVER_URL = 'https://api.genderize.io';
    const firstName = this.state.name;
    const url = `${SERVER_URL}?name=${firstName}`;
    
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    this.showResult(result);
  }
  
  showResult(user) {
    this.setState({
      result: `${user.name} - ${user.gender}`
    });
  }
  
  render() {
    return (
     <div onChange={this.saveName}>
       <form onKeyDown={this.handleEnterEvent.bind(this)}>
         <TextInput/>
       </form>
       <form onClick={this.handleClickEvent.bind(this)}>
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
