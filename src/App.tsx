import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import { UploadModal } from './components/UploadModal';
import { ShareModal } from './components/ShareModal';
import { AuthModal } from './components/AuthModal';
import { mockMovies } from './data/mockMovies';
import { Movie } from './types';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const featuredMovies = mockMovies.filter(movie => movie.is_featured);
  const heroMovie = featuredMovies[0] || mockMovies[0];

  const handleDownload = async (movie: Movie) => {
    // Simulate download
    const downloadUrl = `https://netcine.app/download/${movie.id}`;
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${movie.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(`Download started for "${movie.title}"`);
  };

  const handleShare = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowShareModal(true);
  };

  // Group movies by genre
  const moviesByGenre = mockMovies.reduce((acc, movie) => {
    movie.genre.forEach(genre => {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movie);
    });
    return acc;
  }, {} as Record<string, Movie[]>);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-netflix-black">
        <Header 
          onAuthClick={() => setShowAuthModal(true)}
          onUploadClick={() => setShowUploadModal(true)}
        />
        
        <main>
          {/* Hero Section */}
          <Hero 
            movie={heroMovie}
            onDownload={handleDownload}
            onShare={handleShare}
          />

          {/* Movie Rows */}
          <div className="relative z-10 -mt-32">
            <MovieRow
              title="Featured Content"
              movies={featuredMovies}
              onDownload={handleDownload}
              onShare={handleShare}
            />

            <MovieRow
              title="Trending Now"
              movies={mockMovies.slice().sort((a, b) => b.download_count - a.download_count)}
              onDownload={handleDownload}
              onShare={handleShare}
            />

            {Object.entries(moviesByGenre).map(([genre, movies]) => (
              <MovieRow
                key={genre}
                title={genre}
                movies={movies}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            ))}

            <MovieRow
              title="Recently Added"
              movies={mockMovies.slice().sort((a, b) => 
                new Date(b.upload_date || '').getTime() - new Date(a.upload_date || '').getTime()
              )}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          </div>
        </main>

        {/* Modals */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />

        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />

        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          movie={selectedMovie}
        />
      </div>
    </AuthProvider>
  );
}

export default App;