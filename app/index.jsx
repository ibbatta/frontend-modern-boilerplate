import './index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

const apiUrl = 'https://dog.ceo/api/breeds/image/random/1';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogList: []
    }
  }

  componentDidMount() {
    axios.get(apiUrl).then(result => {
      this.setState({
        dogList: result.data.message
      })
    });
  }

  render() {
    return (
      <section className="wrapper">
        {this.state.dogList.map((dogImage, index) => (
          <img src={dogImage} alt="cane random" key={index} />
        ))}
      </section>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));
