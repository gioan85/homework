import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from 'bloomer';
import "bulma/css/bulma.css";
import MoviesList from './MoviesList';
//import TEST_DATA from './test_json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      loading: true,
      width: window.innewrWidth,
      search: ''
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }          

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    if(window.innerWidth > 767)
    {  
      this.setState({
        width : 'isDesktop'
      })
    }
    if(window.innerWidth <= 767)
    {  
      this.setState({
        width : 'isTablet'
      })
    }
    if(window.innerWidth <= 500)
    {
      this.setState({
        width : 'isMobile'
      })
    }
  }
  
  updateSearch (event) {
    this.setState({search : event.target.value})
    let moviesSearch = this.state.movies.filter(
      (movie) => {
        return movie.title.indexOf(event.target.value) !== -1
      }
    )
    this.setState({moviesSearch: moviesSearch})
  }

  async componentDidMount() {
    const results = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const data = await results.json();
    this.movies = data.results;
    await this.sleep(1000);
    this.setState({
      movies : this.movies,
      loading: false
    });
  }

  sleep(ms){
    return new Promise(timeout => setTimeout(timeout, ms))
  }

  render() {
    let content;
    
    if(this.state.loading)
      content = <h1> I'm loading @ </h1>
    if(this.state.moviesSearch)
      content = <MoviesList movies={this.state.moviesSearch} width={this.state.width}/>
    else
      content = <MoviesList movies={this.state.movies} width={this.state.width}/>
    

    return (
      <Container >
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Flixie</h1>
          </header>
          <Container>
            <input type="text" className="App-search-bar" value={this.state.search} onChange={this.updateSearch.bind(this) }/>
            {content}
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
