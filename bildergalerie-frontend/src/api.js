const API_URL = 'http://localhost:8080';

export const fetchAlbums = async () => {
  try {
    const response = await fetch(`${API_URL}/albums`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const addAlbum = async (albumTitle) => {
  try {
    const response = await fetch(`${API_URL}/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ albumTitle }), // Ensure the field name matches your backend
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding album:', error);
    throw error;
  }
};

export const deleteAlbum = async (albumId) => {
  try {
    const response = await fetch(`${API_URL}/albums/deleteAlbum/${albumId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Network response was not ok', errorDetails);
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting album:', error);
    throw error;
  }
};

export const fetchPhotos = async (albumId) => {
  try {
    const response = await fetch(`${API_URL}/photos/album/${albumId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Network response was not ok', errorDetails);
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const addPhoto = async (albumId, photo) => {
  try {
    const formData = new FormData();
    formData.append('albumId', albumId); // Ensure albumId is included
    formData.append('title', photo.title);
    formData.append('description', photo.description);
    formData.append('location', photo.location);
    formData.append('date', photo.date);
    formData.append('file', photo.file);

    const response = await fetch(`${API_URL}/photos/addPhoto`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Network response was not ok', errorDetails);
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
};

export const updatePhoto = async (photoId, photo) => {
  try {
    const formData = new FormData();
    formData.append('title', photo.title);
    formData.append('description', photo.description);
    formData.append('location', photo.location);
    formData.append('date', photo.date);
    if (photo.file) {
      formData.append('file', photo.file);
    }
    const response = await fetch(`${API_URL}/photos/updatePhoto/${photoId}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Network response was not ok', errorDetails);
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
};


export const deletePhoto = async (photoId) => {
  try {
    const response = await fetch(`${API_URL}/photos/deletePhoto/${photoId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};

export const updateAlbum = async (albumId, albumTitle) => {
  try {
    const response = await fetch(`${API_URL}/albums/updateAlbum/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ albumTitle }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating album:', error);
    throw error;
  }
};


