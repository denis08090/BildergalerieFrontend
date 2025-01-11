import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const MainPage = () => {
    return (
        <div>
            <div className='header'>
                <h1>Welcome to MyCountryAlbum</h1>
            </div>
            <div className='bodyMain'>
                <Link to="/albums" className="overlay">
                    <span className="hover-text">Create Your PhotoGallery</span>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;
