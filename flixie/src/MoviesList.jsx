import React, { Component } from 'react';
import MoiveCard from './MovieCard';
import MovieCard from './MovieCard';

export default class MoviesList extends Component {
    
    
    sort_film (){
        console.log(this.props.movies);
        const sort_film = [].concat(this.props.movies)
        .sort((a, b) => a.vote_cound > b.vote_cound);
        console.log(sort_film);
        //return sort_film;
    }
    
    
    render() {
        return (
            <div>
                {this.props.movies.map (m => <MovieCard movies={m} width={this.props.width}/>)
                    //this.sort_film()
                }
            </div>
        )
    }
}
