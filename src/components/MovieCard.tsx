import React from 'react';
import { Play, Download, Share2, Star } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onDownload: (movie: Movie) => void;
  onShare: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onDownload, onShare }) => {
  return (
    <div className="movie-card min-w-[200px] md:min-w-[250px]">
      <div className="relative rounded-lg overflow-hidden bg-gray-800">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-[300px] md:h-[350px] object-cover"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="movie-card-overlay">
          <div className="flex flex-col items-center space-y-3">
            <button className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors transform hover:scale-110">
              <Play className="w-6 h-6 fill-current" />
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(movie);
                }}
                className="bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(movie);
                }}
                className="bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-white text-xs font-medium">{movie.rating}</span>
        </div>

        {/* Featured Badge */}
        {movie.is_featured && (
          <div className="absolute top-2 right-2 bg-netflix-red px-2 py-1 rounded">
            <span className="text-white text-xs font-bold">FEATURED</span>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="mt-3 px-1">
        <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 mb-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-netflix-light-gray">
          <span>{movie.release_year}</span>
          <span>{movie.duration}m</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-gray-700 text-xs rounded text-netflix-light-gray"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-2 text-xs text-netflix-light-gray">
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3" />
            <span>{(movie.download_count / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share2 className="w-3 h-3" />
            <span>{(movie.share_count / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    </div>
  );
};