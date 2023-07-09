import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 

const Recommendations = () => {
    const location = useLocation();
    const token = location.state.tokengen;
    
    const [userTopTracks, setUserTopTracks] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userRecommendations, setUserRecommendations] = useState(null);
    const [userRecommendetedPlaylistID, setUserRecommendedPlaylistID] = useState(null);

    const CURRENT_USER_TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5';
    const CURRENT_USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
    const CURRENT_USER_RECOMMENDATIONS_ENDPOINT = 'https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=';

    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    let trackIds = [];
    const getTrackData = async () => {
        const trackData = await fetchWebApi(
            CURRENT_USER_TOP_TRACKS_ENDPOINT, 'GET'
        );
        setUserTopTracks(trackData.items);
        for (let i = 0; i < trackData.items.length; i++) {
            trackIds.push(trackData.items[i].id);
        }
        getRecommendations();
    }

    const getProfileData = async () => {
        const profileData = await fetchWebApi(
            CURRENT_USER_PROFILE_ENDPOINT, 'GET'
        );
        setUserProfile(profileData);
        console.log(profileData);
    }

    useEffect(() => {
        getProfileData();
        getTrackData();
    }, []);

    let trackUris = [];
    const getRecommendations = async () => {
        const recommendationsData = await fetchWebApi(
            `https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${trackIds[0]},${trackIds[1]},${trackIds[2]},${trackIds[3]},${trackIds[4]}`, 'GET'
        );
        setUserRecommendations(recommendationsData);
        for (let i = 0; i < recommendationsData.tracks.length; i++) {
            trackUris.push(recommendationsData.tracks[i].uri);
        }
        console.log(trackUris);
        createPlaylist(trackUris);
        // console.log(recommendationsData);
        
    }

    //create playlist
    const createPlaylist = async (trackUris) => {
        const { id: userId } = await fetchWebApi(
            'https://api.spotify.com/v1/me', 'GET'
        );

        const playlist = await fetchWebApi(
            `https://api.spotify.com/v1/users/${userId}/playlists`, 'POST', {
                name: 'GiveMeMusic',
                description: 'My Recommendations',
                public: false
            }
        );
        
        await fetchWebApi(
            `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, 'POST', {
                uris: trackUris,
                position: 0
        });

        setUserRecommendedPlaylistID(playlist.id);
        console.log(playlist.id);
    }

    return (
        <>
            {
                userRecommendetedPlaylistID && 
                <div>
                    <h1>Here is your playlist</h1>
                    <h2>Enjoy!</h2>
                    <br></br>
                    <iframe src={`https://open.spotify.com/embed/playlist/${userRecommendetedPlaylistID}`} width="800" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
            }
            
        </>
    );
}

export default Recommendations;