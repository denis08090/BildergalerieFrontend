import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Select from 'react-select';
import { fetchAlbums, addAlbum, deleteAlbum } from '../api';
import { countries } from '../countries';
import "../index.css";

const AlbumGallery = () => {
  const { albumId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const fetchedAlbums = await fetchAlbums(albumId);
        setAlbums(fetchedAlbums);
      } catch (error) {
        console.error('Error loading albums:', error);
      }
    };
    loadAlbums();
  }, [albumId]);

  const handleSelect = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setError('');
  };

  const handleCreateAlbum = async () => {
    if (selectedCountry) {
      const existingAlbum = albums.find(album => album.albumTitle === selectedCountry.label);
      if (existingAlbum) {
        setError('Album title already exists.');
        return;
      }

      try {
        await addAlbum(selectedCountry.label);
        const updatedAlbums = await fetchAlbums();
        setAlbums(updatedAlbums);
        setSelectedCountry(null);
        setError('');
      } catch (error) {
        console.error('Error creating album:', error);
        setError('Error creating album. Please try again.');
      }
    }
  };

  const handleDelete = async (albumId) => {
    try {
      await deleteAlbum(albumId);
      setAlbums(albums.filter(album => album.albumId !== albumId));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Album Gallery</h1>
      </div>
      <h2>Create a New Album</h2>
      <Select options={countries} onChange={handleSelect} value={selectedCountry} />
      <button onClick={handleCreateAlbum}>Create Album</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Album Gallery</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.albumId}>
            <Link to={`/albums/photos/${album.albumId}`}>{album.albumTitle}</Link>
            <button onClick={() => handleDelete(album.albumId)} className='icon-button'><i className="fas fa-trash"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumGallery;