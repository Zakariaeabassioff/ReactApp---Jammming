
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
      ],

      playlistName: 'Muscu',

      playlistTracks:[
        {name: 'Ca va', artist:'Sch', album: 'Deo Favente', id: 1},
        {name: 'Canada', artist: '1plike140', album: 'Arretez-le', id: 3}
      ]
    };

    this.addTrack = this.addTrack.bind(this);
  }

  //Ajouter une musique de la liste des resultats a la playlist
  addTrack(track){
    let tracks = this.state.playlistTracks;
    //Verifier si la musique existe deja dans la playlist
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    //Ajouter la musique a la playlist
    tracks.push(track);
    //rafraichir le state de la playlist 
    this.setState({playlistTracks : tracks});
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
