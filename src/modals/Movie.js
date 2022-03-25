import React from "react";
import { Modal } from "react-bootstrap";
import Moviedata from './Moviedata'

class Movie extends React.Component {

  render() {
    let movieResults = this.props.movieData.map((movie, index) => {
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
          onClick={this.props.hideModal}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body onClick={this.props.hideModal}>
            {movieResults}
          </Modal.Body>
        </Modal> 
      </>
    )
  }
}
    export default Movie;