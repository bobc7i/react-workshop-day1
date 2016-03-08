import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Boostrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

class HelloWorld extends React.Component {
  render() {
    var now = moment().format('MMMM Do YYYY, h:mm:ss A');
    return (
      <div>
        <Panel>
          <Jumbotron>
            <h1>Welcome to Fort Lauderdale!</h1>
            <p>The current time is: {now}</p>
            <p><Button bsStyle="info">Learn more</Button></p>
          </Jumbotron>
        </Panel>
      </div>
    );
  }
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('root')
);
