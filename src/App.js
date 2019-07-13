import React, { Component } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Form, Input } from 'reactstrap';
import Moment from 'react-moment';

class Header extends Component {
  render() {
    return <h1>Rebuild Shownotes Filter</h1>
  }
}

class Shownote extends Component {
  render() {
    const shownote = this.props.shownote
    return <li><a href={shownote.url} target='_blank' rel='noopener noreferrer'>{shownote.title}</a></li>
  }
}

class Episode extends Component {
  render() {
    const episode = this.props.episode;
    return (<p>
      <span className="epititle"><a href={episode.mediaUrl} target='_blank' rel='noopener noreferrer'>{episode.title}</a></span> <span className="pubdate">(<Moment format='YYYY/MM/DD'>{episode.publicationDate}</Moment>)</span>
      <span>
        {episode.shownotes.map(shownote => <Shownote shownote={shownote} />)}
      </span>
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
    Axios.get('./shownotes-json')
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
          <Row><Col xs="3"><Form><Input type='text' placeholder='query' onChange={this.filterShownotes} /></Form></Col></Row>
          <Episodes episodes={this.state.episodes} />
        </Container>
      </div>
    );
  }
}

export default App;
