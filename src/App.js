import React, { Component } from 'react';
import './App.css';
import Morse from 'morse';
import execSeries from 'exec-series';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  async parse(code) {
    await this.dot();
    await this.dot();
    await this.dot();
    await this.letterSpace();
    await this.dash();
    await this.dash();
    await this.dash();
    await this.letterSpace();
    await this.dot();
    await this.dot();
    await this.dot();

    /* equivalent to
      this.dot().then(() => this.dash())
    */
  }



  async dot() {
    let off = {"on": false}
    let on = {"on": true}
    this.flicker(on)
    await delay(800)
    this.flicker(off)
    await delay(1000)
  }

  async dash() {
    let off = {"on": false}
    let on = {"on": true}
    this.flicker(on)
    await delay(2400);
    this.flicker(off)
    await delay(1000)
  }

  async letterSpace() {
    await delay(1400)
  }

  async wordSpace() {
    await delay(5600)
  }


  flicker(data) {
    return fetch(`http://10.0.1.196/api/xRLSMy7MSQjwMIBz1v0OJvczvu9L2pSwB144tEUd/groups/1/action`, {
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
