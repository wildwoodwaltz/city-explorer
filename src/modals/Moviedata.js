import React from  'react';
import '../Header'


class Moviedata extends React.Component {

render(){
console.log(this.props.movie)
  return (
    <>
    <h1>{this.props.movie.title}</h1>
    <p>{this.props.movie.description}</p>
    <p>Language: {this.props.movie.language}</p>
    </>
  );
}
}

export default Moviedata;