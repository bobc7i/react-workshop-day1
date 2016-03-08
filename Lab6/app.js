import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';

class SelectedLunchPanel extends React.Component {
  componentWillMount(){
    console.log('SLP - componentWillMount');
  }
  componentDidMount() {
    console.log('SLP - componentDidMount');
  }
  componentWillReceiveProps(nextProps) {
    console.log('SLP - componentWillReceiveProps', nextProps);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('SLP - componentWillUpdate', nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('SLP - componentDidUpdate', prevProps, prevState);
  }
  componentWillUnmount() {
    console.log('SLP - componentWillUnmount');
  }
  render() {
    return (
      <div>
        <Panel header="You've picked" bsStyle="warning">
          {this.props.selectedLunch}
        </Panel>
      </div>
    )
  }
}

class LunchOptionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedLunch: 'Nothing selected'};
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    this.setState({selectedLunch: event.target.textContent});
  }
  componentWillMount(){
    console.log('LOP - componentWillMount');
  }
  componentDidMount() {
    console.log('LOP - componentDidMount');
  }
  componentWillReceiveProps(nextProps) {
    console.log('LOP - componentWillReceiveProps', nextProps);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('LOP - componentWillUpdate', nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('LOP - componentDidUpdate', prevProps, prevState);
  }
  componentWillUnmount() {
    console.log('LOP - componentWillUnmount');
  }
  render() {
    let onClick = this._handleClick,
        lunchOptions = this.props.lunchChoices.map(function (choice, idx) {
      return <h2 key={idx}><Label onClick={onClick}>{choice}</Label></h2>;
    });
    return (
      <div>
        <Panel header="Please select one" bsStyle="info">
          {lunchOptions}
          <SelectedLunchPanel selectedLunch={this.state.selectedLunch}/>
        </Panel>
      </div>
    )
  }
}

class LunchApp extends React.Component {
  render() {
    let now = moment().format('MMMM Do YYYY');
    return (
      <div>
        <Panel>
          <h2>Options for lunch for {now}</h2>
          <LunchOptionsPanel lunchChoices={this.props.lunchChoices}/>
        </Panel>
      </div>
    );
  }
}

var lunchChoices = ['Chicken', 'Fish', 'Vegitarian'];

ReactDOM.render(
  <LunchApp lunchChoices={lunchChoices}/>,
  document.getElementById('root')
);
