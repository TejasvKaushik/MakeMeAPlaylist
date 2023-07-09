import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

const TopTracks = () => {
    const location = useLocation();
    const token = location.state.tokengen;
    const [userTopTracks, setUserTopTracks] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const CURRENT_USER_TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10';
    const CURRENT_USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';

    let trackIds = [];
    let trackID = [];
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
        for (let i = 0; i < trackData.items.length; i++) {
            trackIds.push(trackData.items[i].id);
        }
        // console.log(trackData);
        // console.log(trackIds);
        trackID = trackIds;
    }
    const getProfileData = async () => {
        const profileData = await fetchWebApi(
            CURRENT_USER_PROFILE_ENDPOINT, 'GET'
        );
        setUserProfile(profileData);
        // console.log(profileData);
    }



    useEffect(() => {
        getProfileData();
        getTrackData();
    }, []);

    useEffect(() => {
        console.log(trackID);
    }, [trackID]);

    return (
        <div>
            {
                userTopTracks && 
                <div className='list'>
                    {
                        <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto'}}>
                        {
                            userTopTracks.map((track, index) => {
                            return (
                                <div className='track' key={index}>
                                    <img src={track.album.images[1].url} alt={track.name} />
                                    <h4>{track.name}</h4>
                                    <p>{track.artists[0].name}</p>
                                </div>
                            )
                        })}
                        </div>
                        
                    }
                </div>
            }
            <div>
                <Link to={'/recommendations'} state={{tokengen: token}}><h1 className='title'>Recommend me a playlist!</h1></Link>
            </div>
        </div>
    )
}

export default TopTracks;