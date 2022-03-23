import React from "react";
import { Modal } from "react-bootstrap";
import Moviedata from './Moviedata'

class Movie extends React.Component {

  render() {
    let movieResults = this.props.movieData.map((movie, index) => {
      console.log(index)
      console.log(movie)
      return (
       <Moviedata
       key = {index}  
       movie={movie}
       />
      );
    }
    );
    return (
      <>
        <Modal
          show={this.props.movieModal}
          onClick={this.props.hideMovieModal}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body onClick={this.props.hideMovieModal}>
            {movieResults}
          </Modal.Body>
        </Modal> 
      </>
    )
  }
}
    export default Movie;