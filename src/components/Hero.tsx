import React from 'react';
import { Play, Info, Download, Share2 } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onDownload: (movie: Movie) => void;
  onShare: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onDownload, onShare }) => {
  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">
          {movie.title}
        </h1>
        
        <p className="text-lg md:text-xl text-netflix-light-gray mb-6 leading-relaxed animate-slide-up">
          {movie.description}
        </p>

        <div className="flex items-center space-x-4 mb-8 animate-slide-up">
          <div className="flex items-center space-x-2">
            <span className="text-green-500 font-semibold">★ {movie.rating}</span>
            <span className="text-netflix-light-gray">{movie.release_year}</span>
            <span className="text-netflix-light-gray">{movie.duration}m</span>
          </div>
          <div className="flex space-x-2">
            {movie.genre.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-gray-700 text-xs rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 animate-slide-up">
          <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-all transform hover:scale-105">
            <Play className="w-5 h-5 fill-current" />
            <span>Play</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-all">
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>

          <button
            onClick={() => onDownload(movie)}
            className="flex items-center space-x-2 bg-gray-800/70 text-white px-6 py-3 rounded font-semibold hover:bg-gray-700 transition-all"
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline">Download</span>
          </button>

          <button
            onClick={() => onShare(movie)}
            className="flex items-center space-x-2 bg-gray-800/70 text-white px-6 py-3 rounded font-semibold hover:bg-gray-700 transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden md:inline">Share</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 mt-6 text-sm text-netflix-light-gray animate-slide-up">
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{movie.download_count.toLocaleString()} downloads</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share2 className="w-4 h-4" />
            <span>{movie.share_count.toLocaleString()} shares</span>
          </div>
        </div>
      </div>
    </div>
  );
};