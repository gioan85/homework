import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

export default class MoviesList extends Component {    
    render() {
        return (
            <div>
                {
                    this.props.movies.map(m => <MovieCard key={m.id} movies={m} width={this.props.width}/>)
                }
            </div>
        )
    }
}

MoviesList.propTypes = {
    movies: PropTypes.array,
    width: PropTypes.number,
}
