import React, { useState } from 'react';
import { X, Copy, Facebook, Twitter, Mail, Link, Check } from 'lucide-react';
import { Movie } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, movie }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !movie) return null;

  const shareUrl = `https://netcine.app/watch/${movie.id}`;
  const shareText = `Check out "${movie.title}" on NETCINE! ${movie.description.slice(0, 100)}...`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(`Check out ${movie.title}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Share "{movie.title}"</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Movie Preview */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-800 rounded-lg">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-16 h-24 object-cover rounded"
          />
          <div>
            <h3 className="text-white font-semibold">{movie.title}</h3>
            <p className="text-gray-400 text-sm">{movie.release_year} • {movie.duration}m</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-yellow-500">★ {movie.rating}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{movie.genre.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Share URL */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Share Link</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="input-field flex-1"
            />
            <button
              onClick={copyToClipboard}
              className={`flex items-center space-x-2 px-4 py-3 rounded transition-all ${
                copied 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Social Share Options */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-3">Share on Social Media</label>
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option.url)}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded text-white transition-colors ${option.color}`}
              >
                {option.icon}
                <span className="hidden sm:inline">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Direct Link Share */}
        <div className="mb-6">
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-netflix-red hover:bg-red-700 text-white rounded transition-colors"
          >
            <Link className="w-4 h-4" />
            <span>Copy Direct Link</span>
          </button>
        </div>

        {/* Stats */}
        <div className="text-center text-gray-400 text-sm">
          <p>This content has been shared {movie.share_count.toLocaleString()} times</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};