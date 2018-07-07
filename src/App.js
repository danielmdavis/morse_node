import React, { Component } from 'react';
import './App.css';
import Morse from 'morse';

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


    let morse = Morse.encode(this.state.inputText)
    while (morse.indexOf('.......') !== -1) {
      morse = morse.replace('.......', '/')
    }
    let queue = morse.split('')
    this.setState({ codeText: queue })
    document.getElementById('form').value = morse
    this.parse(queue)
  }

  async parse(code) {

    let queue = code
    let current
    console.log(queue);

    while (queue.length > 0) {
      current = queue.shift()
      if (current === '.'){await this.dot()}
      if (current === '-'){await this.dash()}
      if (current === ' '){await this.letterSpace()}
      if (current === '/'){await this.wordSpace()}
    }

  }

  async dot() {
    let off = {"transitiontime":0, "bri":255, "on": false}
    let on = {"transitiontime":0, "bri":255, "on": true}
    this.flicker(on)
    await delay(400)
    this.flicker(off)
    await delay(400)
  }
  async dash() {
    let off = {"transitiontime":0, "bri":255, "on": false}
    let on = {"transitiontime":0, "bri":255, "on": true}
    this.flicker(on)
    await delay(1200);
    this.flicker(off)
    await delay(400)
  }
  async letterSpace() {
    await delay(800)
  }
  async wordSpace() {
    await delay(1600)
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
            id='form'
            autocomplete='off'
            value={this.inputText}
            type='text'
            onChange={this.handleText}
            placeholder="Enter Message to Broadcast"
            /> <br/>
          <input type="submit" value="Submit" className="submit" />
        </form>

    )
  }
}

export default App;
