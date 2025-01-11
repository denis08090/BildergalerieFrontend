import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotos, addPhoto, deletePhoto, updatePhoto } from '../api';

const PhotoGallery = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [photoDate, setPhotoDate] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [editingPhotoId, setEditingPhotoId] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const fetchedPhotos = await fetchPhotos(albumId);
        console.log('Fetched Photos:', fetchedPhotos); // Console log
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    };

    loadPhotos();
  }, [albumId]);

  const handleUpload = async (event) => {
    event.preventDefault();

    const newPhoto = {
      title: photoTitle,
      location: photoLocation,
      date: photoDate,
      file: photoFile,
    };

    try {
      if (editingPhotoId) {
        await updatePhoto(editingPhotoId, newPhoto);
        setEditingPhotoId(null);
      } else {
        await addPhoto(albumId, newPhoto);
      }
      const updatedPhotos = await fetchPhotos(albumId);
      setPhotos(updatedPhotos);
      resetForm();
    } catch (error) {
      console.error('Error uploading/updating photo:', error);
    }
  };

  const handleDelete = async (photoId) => {
    try {
      await deletePhoto(photoId);
      const updatedPhotos = await fetchPhotos(albumId);
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleEdit = (photo) => {
    setPhotoTitle(photo.photoTitle);
    setPhotoLocation(photo.photoLocation);
    setPhotoDate(photo.photoDate);
    setPhotoFile(null); // Reset the file input
    setEditingPhotoId(photo.photoId);
  };

  const resetForm = () => {
    setPhotoTitle('');
    setPhotoLocation('');
    setPhotoDate('');
    setPhotoFile(null);
    setEditingPhotoId(null);
  };

  // Get today's date in the format yyyy-MM-dd
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className='header'>
        <h2>Photo Gallery</h2>
      </div>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          name="photoTitle"
          placeholder="Title"
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="photoLocation"
          placeholder="City"
          value={photoLocation}
          onChange={(e) => setPhotoLocation(e.target.value)}
          required
        />
        <input
          type="date"
          name="photoDate"
          value={photoDate}
          max={today} // Prevent future dates
          onChange={(e) => setPhotoDate(e.target.value)}
          required
        />
        <input
          type="file"
          name="photoFile"
          onChange={(e) => setPhotoFile(e.target.files[0])}
          required={!editingPhotoId}
        />
        <button type="submit">{editingPhotoId ? 'Update Photo' : 'Upload Photo'}</button>
        {editingPhotoId && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h2>Photos:</h2>
      <ul>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <li key={photo.photoId}>
              <h3>{photo.photoTitle}</h3>
              <p>{photo.photoLocation}</p> 
              <p>{photo.photoDate}</p>
              <button onClick={() => handleDelete(photo.photoId)} className='icon-button'><i className="fas fa-trash"></i></button>
              <button onClick={() => handleEdit(photo)} className='icon-button'><i className="fas fa-cog"></i></button>
            </li>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </ul>
    </div>
  );
};

export default PhotoGallery;
