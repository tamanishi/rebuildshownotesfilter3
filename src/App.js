import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

class Header extends Component {
  render() {
    return <h1>Rebuild Shownotes Filter</h1>
  }
}

class Shownote extends Component {
  render() {
    const shownote = this.props.shownote
    return <li><a href={shownote.url} target='_blank'>{shownote.title}</a></li>
  }
}

class Episode extends Component {
  render() {
    const episode = this.props.episode;
    return (<p>
      <a href={episode.mediaUrl} target='_blank'>{episode.title}</a>
      <ul>
        {episode.shownotes.map(shownote => <Shownote shownote={shownote} />)}
      </ul>
    </p>)
  }
}

class Episodes extends Component {
  render() {
    return <div>{this.props.episodes.map(episode => <Episode episode={episode} />)}</div>
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullEpisodes: [],
      episodes: []
    }
  }
  componentDidMount() {
    axios.get('./json/episodes.json')
    .then((res) => {
      this.setState({episodes: res.data.episodes})
      this.setState({fullEpisodes: res.data.episodes})
    })
  }
  filterShownotes = (e) => {
    this.refs.EpisodesComp.filterShownotes(e)
  }
  filterShownotes = (e) => {
    const filtered = this.state.fullEpisodes
    .map(episode => ({
      ...episode,
      shownotes: episode.shownotes
        .filter(shownote => shownote.title.toLowerCase().includes(e.target.value.toLowerCase()))
    }))
    .filter(episode => episode.shownotes.length > 0)
    this.setState({episodes: filtered})
  }
  render() {
    return (
     <div className="App">
        <Container>
          <Header />
          <Row><Col><input type='text' placeholder='keyword' onChange={this.filterShownotes} /></Col></Row>
          <Episodes episodes={this.state.episodes} />
        </Container>
      </div>
    );
  }
}

export default App;
