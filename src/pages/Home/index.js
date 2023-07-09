import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {

    const [token, setToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userTopTracks, setUserTopTracks] = useState(null);
    const [userTopArtists, setUserTopArtists] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState(null);

    const CURRENT_USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
    const CURRENT_USER_TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10';
    const CURRENT_USER_TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
    const CURRENT_USER_PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';


    const getParamsFromHash = (hash) => {
        const hashContent = hash.substring(1);
        const paramsInUrl = hashContent.split('&');
        let params = {};
        let values = [];
        paramsInUrl.forEach(param => {
            values = param.split('=');
            params[values[0]] = values[1];
        });
        return params;
    }

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

    const getTrackData = async () => {
        const trackData = await fetchWebApi(
            CURRENT_USER_TOP_TRACKS_ENDPOINT, 'GET'
        );
        setUserTopTracks(trackData.items);
        console.log(trackData);
    }

    const getProfileData = async () => {
        const profileData = await fetchWebApi(
            CURRENT_USER_PROFILE_ENDPOINT, 'GET'
        );
        setUserProfile(profileData);
        console.log(profileData);
    }

    const getArtistData = async () => {
        const artistData = await fetchWebApi(
            CURRENT_USER_TOP_ARTISTS_ENDPOINT, 'GET'
        );
        setUserTopArtists(artistData);
        console.log(artistData);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, [token]);

    useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash;
            const tokens = getParamsFromHash(hash);
            localStorage.setItem('token', tokens.access_token);
            setToken(tokens.access_token);
            window.history.pushState(null, null, '/home');
        }
    }, []);

    useEffect(() => {
        if (token) {
            getProfileData();
        }
    }, [token]);

    return (
        <div>
            <div>
                <Link to={'/toptracks'} state={{tokengen: token}}>Get Top Tracks</Link>
            </div>
            <div>
                <button onClick={() => getArtistData()}>Get Top Artists</button>
            </div>
            {
                userTopArtists && userTopArtists.items.map((artist, index) => {
                    return (
                        <div key={index}>
                            <h1>{artist.name}</h1>
                            <img src={artist.images[1].url} alt={artist.name} />
                        </div>
                    )
                }
                )
            }


        </div>
    );

    
}

export default Home;

