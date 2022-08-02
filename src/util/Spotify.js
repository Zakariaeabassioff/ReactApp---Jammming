const clientId = '73e2805cf96843c0bc0dddc129549816';
const redirectUri = 'http://localhost:3000/';
let userAccessToken;

const Spotify = {
    //Recuperer l'access token de l'utilisateur dont on aura besoin pour demander des requetes a l'API spotify
    getAccessToken(){
        if(userAccessToken){
            return userAccessToken;
        }

        //Chercher l'access Token dans l'URL
        const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if(userAccessTokenMatch && expiresInMatch){
            userAccessToken = userAccessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //Liberez les parametres, pour affectez de nouveaux quand l'access token expire
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    //Methode qui prend un param de recherche, le passe a la requete Spotify, puis retourn une reponse sous forme d'une liste de tracks dans le format JSON
    search(searchTerm){
        const accessToken = Spotify.getAccessToken();
        //Passer la requete a l'API
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: { 
            Authorization: `Bearer ${accessToken}` } }
            //transformer le resultat de la recherche en fichiers JSON
            ).then(response => { 
            return response.json();
            //map le fichier JSON en un tableau de tracks
            }).then(jsonResponse => {
                if(!jsonResponse.tracks){
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },

    //Methode qui enrgistre la playlist de l'utilisateur dans son compte Spotify

    savePlaylist(playlistName, trackUris){
        if(!playlistName || !trackUris.length){
            return;
        }

        //Recuperer l'id de l'utilisateur
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        //passer la requete
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        //transformer le resultat de la recherche en fichiers JSON
        ).then(response => response.json()
        //affecter la valeur a userId
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            // Utiliser le userId pour passer une requete creant une nouvelle playlist dans le compte de l'utilisateur et recuperer l'id de cette nouvelle playlist 

            //passer la requete
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }//Convertir la reponse en fichier JSON
            ).then(response => response.json()
            //Affecter la valeur a playlistId
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                //Ajouter des tracks a la playlist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, { 
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                });
            });
        })
    }
}

export default Spotify;