// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AlbumGallery from './pages/AlbumGallery';
import PhotoGallery from './pages/PhotoGallery';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <Router>
      <div>
     
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/albums" element={<AlbumGallery />} />
          <Route path="/albums/photos/:albumId" element={<PhotoGallery />} />        </Routes>
      </div>
    </Router>
  );
};

export default App;
