import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AlbumGallery from '../pages/AlbumGallery';
import { fetchAlbums, addAlbum, deleteAlbum } from '../api';

jest.mock('../api');

describe('AlbumGallery Component', () => {
  const mockAlbums = [
    { albumId: 1, albumTitle: 'Album 1' },
    { albumId: 2, albumTitle: 'Album 2' },
  ];

  beforeEach(() => {
    fetchAlbums.mockResolvedValue(mockAlbums);
    addAlbum.mockResolvedValue({ albumId: 3, albumTitle: 'Album 3' });
    deleteAlbum.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AlbumGallery />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('Album section')).toBeInTheDocument();
  });

  test('displays the correct header and button', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AlbumGallery />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('Create a New Album')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Album/i })).toBeInTheDocument();
  });

  test('displays header and create album button correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AlbumGallery />
        </MemoryRouter>
      );
    });
  
    // Check if the header is displayed
    expect(screen.getByText('Album section')).toBeInTheDocument();
  
    // Check if the "Create Album" button is displayed
    const createAlbumButton = screen.getByRole('button', { name: /Create Album/i });
    expect(createAlbumButton).toBeInTheDocument();
  });
  
  
  test('renders correctly with no albums', async () => {
    // Mocking the API call to return no albums
    fetchAlbums.mockResolvedValueOnce([]);
  
    await act(async () => {
      render(
        <MemoryRouter>
          <AlbumGallery />
        </MemoryRouter>
      );
    });
  
    // Check if the component does not display any albums
    expect(screen.queryByText('Album 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Album 2')).not.toBeInTheDocument();
  
    // Optional: Check if any placeholder or message is displayed for no albums
    // Adjust this based on the actual implementation
    // For example, if the component shows "No albums found" message
    // expect(screen.getByText('No albums found')).toBeInTheDocument();
  });
  
  
  test('handles album deletion', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AlbumGallery />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(fetchAlbums).toHaveBeenCalledTimes(1));

    const deleteButton = screen.getAllByRole('button')[1]; // Adjusted the index
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => expect(deleteAlbum).toHaveBeenCalledWith(1));
    expect(deleteAlbum).toHaveBeenCalledWith(1);
  });
});
