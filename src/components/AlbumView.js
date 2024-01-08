//folder components file AlbumtView.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AlbumView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`;
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const resData = await response.json();
                setAlbumData(resData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track');

    const renderSongs = justSongs.map((song, i) => (
        <div key={i}>
            <p>{song.trackName}</p>
        </div>
    ));

    const navButtons = () => (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );

    return (
        <div>
            {navButtons()}
            {renderSongs}
        </div>
    );
}

export default AlbumView;

