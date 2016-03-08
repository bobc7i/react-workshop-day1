import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios'

class LunchApp extends React.Component {
  render() {
    var now = new Date();
    var formattedDate = moment(now).format('MMMM Do YYYY');
    return (
      <div>
        <Panel>
          <h2>Options for lunch for {formattedDate}:</h2>
          <LunchOptionsPanel lunchData={this.props.lunchChoices}> </LunchOptionsPanel>
        </Panel>
      </div>
    );
  }
}

class LunchOptionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedLunch: 'Nothing selected'};
    this.handleClick = this.handleClick.bind(this);
    this.onLunchSelected = this.onLunchSelected.bind(this);
  }
  onLunchSelected(name, instructions) {
    this.saveLunchSelection(name, this.state.selectedLunch, instructions);
  }
  handleClick(event) {
    // may need to use innerText for older IE
    this.setState({
      selectedLunch: event.target.textContent
    });
  }
  saveLunchSelection(name, lunch, instructions) {
    console.log('Saving ', name, lunch, instructions);
    axios.post('/lunches', {
      name: name,
      lunch: lunch,
      instructions: instructions
    })
    .then(function (response) {
      // success(response);
      console.log(response);
    })
    .catch(function (response) {
      // error(response);
    });
  }
  render() {
    let clickHandler = this.handleClick;
    let lunchOptions = this.props.lunchData.map(function(c,i) {
      return <h3 key={i} onClick={clickHandler}><Label>{c}</Label></h3>;
    });
    return (
      <div>
        <Panel header="Please select one" bsStyle="info">
          {lunchOptions}
        </Panel>
        <SelectedLunchPanel
           selectedLunch={this.state.selectedLunch}
           onUpdate={this.onLunchSelected}/>
        <AllLunchOrdersPanel/>
      </div>
    );
  }
}

class AllLunchOrdersPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {lunches: []};
    this.getLunchOrders = this.getLunchOrders.bind(this);
  }
  getLunchOrders() {
    let _this = this;
    axios.get('/lunches')
    .then(function (response) {
      _this.setState({
        lunches: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  render() {
    let lunchOrders = this.state.lunches.map(function(lunch, idx) {
      return (
        <p key={idx}>
          Guest {lunch.name} ordered {lunch.lunch} with instructions {lunch.instructions}
        </p>
      );
    });

    return (
      <div>
        <Button onClick={this.getLunchOrders}>Get Lunch Orders</Button>
        <Panel header="Lunch Orders" bsStyle="info">
          {lunchOrders}
        </Panel>
      </div>
    )
  }
 }

class SelectedLunchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.updateInstructions = this.updateInstructions.bind(this);
    this.state = { instructions: '' };
  }
  updateInstructions(instructions, guestName) {
    this.setState({
      instructions: instructions
    });
    this.props.onUpdate(guestName, instructions);
  }
  render() {
    return (
      <div>
        <Panel header="You've picked" bsStyle="warning">
          <Label>{this.props.selectedLunch}</Label>
          <p>Special Instructions: {this.state.instructions}</p>
          <SpecialInstructionsInput
            value={this.state.instructions}
            updateInstructions={this.updateInstructions}
            />
        </Panel>
      </div>
    );
  }
}

class SpecialInstructionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.updateInstructions(
      this.refs.specialInstructionsInput.value,
      this.refs.guestName.value);
  }
  render() {
    return (
      <div>
        <div>
          <Label>Guest name:</Label>
          <input ref='guestName' type='text'/>
        </div>
        <div>
          <Label>Instructions:</Label>
          <input ref='specialInstructionsInput' type='text'/>
        </div>
        <Button onClick={this.handleChange}>Submit</Button>
      </div>
    );
  }
}

var lunchChoices = ['Chicken', 'Fish', 'Vegetarian'];
ReactDOM.render(
  <LunchApp lunchChoices={lunchChoices}/>,
  document.getElementById('root')
);
