const express = require('express');
const app = express();

app.get('/albums/:albumId/photos', (req, res) => {
  const { albumId } = req.params;
  // Fetch photos from your database or source based on albumId
  const photos = [
    { photoId: 1, photoName: 'Photo 1', photoDescription: 'Description 1' },
    { photoId: 2, photoName: 'Photo 2', photoDescription: 'Description 2' },
  ];

  if (!photos) {
    return res.status(404).send('Photos not found');
  }

  res.json(photos);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
