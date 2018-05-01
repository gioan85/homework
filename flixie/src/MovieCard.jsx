import React, { Component } from "react";
import { Box } from "bloomer";
import "./MovieCard.css";
import {withGetScreen} from 'react-getscreen'


export default class MovieCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      path: 'https://image.tmdb.org/t/p/original/',
      style: 'DesktopStyle',
      show: true
    }
  }

  path(){
    try{
      if(this.props.isMobile()) 
        return 'https://image.tmdb.org/t/p/w342'
      if(this.props.isTablet())
        return 'https://image.tmdb.org/t/p/w45'
      else
        return 'https://image.tmdb.org/t/p/original/'
    }
    catch(e){
      return e;
    }
  }

  path_2 = () => {
    if(this.props.width == 'isDesktop')
      this.setState ({
        path : 'https://image.tmdb.org/t/p/original/',
        style : 'DesktopStyle'
      })
    if(this.props.width == 'isMobile')
      this.setState({
        path : 'https://image.tmdb.org/t/p/w45',
        style : 'MobileStyle'
      })
    //tablet
    if(this.props.width == 'isTablet')
      this.setState ({
        path : 'https://image.tmdb.org/t/p/w342',
        style : 'TabletStyle'
      })
    
  }

  componentWillMount() {
    window.addEventListener('resize reload', this.path_2);
  }          

  componentWillUnmount() {
    window.removeEventListener('resize reload', this.path_2);
  }

  ShowHide_Overview(){
    //console.log(this.props.overview)
    this.setState({show:!this.state.show})
  }

  render() {
    return (
      <Box className={'MovieCard-Box ' + this.state.style}>
        <img src={this.state.path + this.props.movies.backdrop_path} className="Movie-poster" />
        <p>{this.props.movies.title}</p>
        <p className={"MovieCard-Overview " + (this.state.show ? "isShow" : "isHide")}>{ this.props.movies.overview}</p>
        <a href="javascript:void(0)" className="ShowHideOverview" onClick={this.ShowHide_Overview.bind(this)}>Overview</a>
      </Box>
    );
  }
}
