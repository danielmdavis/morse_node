import React, { Component } from 'react';
import './App.css';
import Morse from 'morse';
import execSeries from 'exec-series';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: '',
      codeText: ''

    }
    this.handleText = this.handleText.bind(this);
    this.handleFlicker = this.handleFlicker.bind(this);
  }

  handleText(event) {
    this.setState({ inputText: event.target.value })
  }

  handleFlicker(event) {
    event.preventDefault()
    // this.setState({ event.target.value: code })
    // this.forceUpdate();
    this.setState({ codeText: Morse.encode(this.state.inputText) })
    this.parse(this.state.codeText)
  }

  parse(code) {

    execSeries([

      this.dot(),
      this.dash()

    ])


  }

  dot() {
    let off = {"on":false}
    let on = {"on":true}

    this.flicker(on)

    setTimeout(function() {
      this.flicker(off)
    }
    .bind(this), 1500);
  }

  dash() {
    let off = {"on":false}
    let on = {"on":true}

    this.flicker(on)

    setTimeout(function() {
      this.flicker(off)
    }
    .bind(this), 4500);
  }

  flicker(data) {
    fetch(`http://10.0.1.196/api/xRLSMy7MSQjwMIBz1v0OJvczvu9L2pSwB144tEUd/groups/1/action`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => console.error(`Error in fetch (submitting books error): ${error.message}`))
  }







  render() {






    return (

        <form onSubmit={this.handleFlicker} className="form">

          <input
            value={this.inputText}
            type='text'
            onChange={this.handleText}
            placeholder="Enter Message"
            /> <br/>
          <input type="submit" value="Submit" className="submit" />
        </form>

    )
  }
}

export default App;
