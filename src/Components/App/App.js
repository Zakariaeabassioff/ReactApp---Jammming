
import './App.css';
import { render } from '@testing-library/react';
import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks:[]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  //Supprimer une musique de la playlist 
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    //Enlever la musique la playlist
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    //Rafraichir le state de la playlist
    this.setState({playlistTracks : tracks});
  }

  //Changer le nom de la playlist
  updatePlaylistName(name){
    this.setState({playlistName : name});
  }

  //Enregistrer la playlist dans le compte spotify de l'utilisateur
  savePlaylist(){
    //Tableau contenant les URIs des musiques/albums/artists
    //URI : (Uniform Ressource Indicator) Link qui dirige directement a l'application Spotify 
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => { 
      this.setState(
        { 
          playlistName: 'New Playlist',
          playlistTracks: []
        }
      )
    });
  }

  //Lier la barre de recherche a l'API Spotify de tel sorte a ce que l'utilisateur rentre un parametre (nom de musique/artiste/album) et l'API retourne une reponse qui s'affiche dans la section Results
  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults})
    })
  } 


  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults} 
            onAdd={this.addTrack}
            />
          <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName} 
            onSave={this.savePlaylist}
            /> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
