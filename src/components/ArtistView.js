//folder components file ArtistView.js
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ArtistView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [artistData, setArtistData] = useState([]);

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`;
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const resData = await response.json();
                setArtistData(resData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const justAlbums = artistData.filter((entry) => entry.collectionType === 'Album');

    const renderAlbums = justAlbums.map((album) => (
        <div key={album.collectionId}>
            <Link to={`/album/${album.collectionId}`}>
                <p>{album.collectionName}</p>
            </Link>
        </div>
    ));

    const navButtons = () => (
        <div>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );

    return (
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderAlbums}
        </div>
    );
}

export default ArtistView;



