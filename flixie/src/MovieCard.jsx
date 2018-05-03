import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Box } from "bloomer";
import "./MovieCard.css";


export default class MovieCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      path: 'https://image.tmdb.org/t/p/original/',
      style: 'DesktopStyle',
      show: true
    }

    this.toggleOverview = this.toggleOverview.bind(this);
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
    window.addEventListener('resize', this.path_2);
  }          

  componentWillUnmount() {
    window.removeEventListener('resize', this.path_2);
  }

  toggleOverview() {
    this.setState({show: !this.state.show})
  }

  render() {
    return (
      <Box className={'MovieCard-Box ' + this.state.style}>
        <img src={this.state.path + this.props.movie.backdrop_path} className="Movie-poster" />
        <p>{this.props.movie.title}</p>
        <p className={"MovieCard-Overview " + (this.state.show ? "isShow" : "isHide")}>{this.props.movie.overview}</p>
        <a href="javascript:void(0)" className="ShowHideOverview" onClick={this.toggleOverview}>Overview</a>
      </Box>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    backdrop_path: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
  }),
  width: PropTypes.string,
};
