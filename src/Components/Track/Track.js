import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    renderAction(){
        if(this.props.isRemoval){
            return <button className="TrackAction">-</button>
        } else {
            return <button className="TrackAction" onClick={this.addTrack}>+</button>
        }
    }

    //Ajouter une musique de la section results a la section playlist en appuyant sur le button '+'
    addTrack(){
        this.props.onAdd(this.props.track);
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;