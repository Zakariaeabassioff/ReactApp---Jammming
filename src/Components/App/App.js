
import './App.css';
import { render } from '@testing-library/react';
import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: 'Ca va', artist:'Sch', album: 'Deo Favente', id: 1},
        {name: 'Les annees de plombs', artist:'Sch', album: 'Deo Favente', id: 2},
        {name: 'Canada', artist: '1plike140', album: 'Arretez-le', id: 3},
      ]
    }
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist /> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
