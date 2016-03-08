import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';

class SelectedLunchPanel extends React.Component {
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
  render() {
    let onClick = this._handleClick,
        lunchOptions = this.props.lunchChoices.map(function (choice) {
      return <h2><Label onClick={onClick}>{choice}</Label></h2>;
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
