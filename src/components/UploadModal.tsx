import React, { useState } from 'react';
import { X, Upload, Film, Image, FileText } from 'lucide-react';
import { UploadProgress } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    status: 'idle'
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    releaseYear: '',
  });
  const [files, setFiles] = useState({
    video: null as File | null,
    poster: null as File | null,
    backdrop: null as File | null,
  });

  if (!isOpen) return null;

  const handleFileChange = (type: 'video' | 'poster' | 'backdrop', file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files.video || !files.poster) {
      alert('Please select at least a video file and poster image');
      return;
    }

    setUploadProgress({ progress: 0, status: 'uploading', message: 'Starting upload...' });

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress({
          progress: i,
          status: i < 100 ? 'uploading' : 'processing',
          message: i < 100 ? `Uploading... ${i}%` : 'Processing video...'
        });
      }

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadProgress({
        progress: 100,
        status: 'complete',
        message: 'Upload completed successfully!'
      });

      setTimeout(() => {
        onClose();
        setUploadProgress({ progress: 0, status: 'idle' });
        setFormData({
          title: '',
          description: '',
          genre: '',
          duration: '',
          releaseYear: '',
        });
        setFiles({ video: null, poster: null, backdrop: null });
      }, 2000);

    } catch (error) {
      setUploadProgress({
        progress: 0,
        status: 'error',
        message: 'Upload failed. Please try again.'
      });
    }
  };

  const FileUploadArea: React.FC<{
    type: 'video' | 'poster' | 'backdrop';
    accept: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ type, accept, icon, title, description }) => (
    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-netflix-red transition-colors">
      <input
        type="file"
        accept={accept}
        onChange={(e) => handleFileChange(type, e.target.files?.[0] || null)}
        className="hidden"
        id={`${type}-upload`}
      />
      <label htmlFor={`${type}-upload`} className="cursor-pointer">
        <div className="flex flex-col items-center space-y-2">
          {icon}
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
          {files[type] && (
            <p className="text-netflix-red text-sm font-medium">
              {files[type]!.name}
            </p>
          )}
        </div>
      </label>
    </div>
  );

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Upload Content</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {uploadProgress.status === 'idle' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Genre</label>
                <input
                  type="text"
                  value={formData.genre}
                  onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                  placeholder="e.g., Action, Drama, Comedy"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Release Year</label>
                <input
                  type="number"
                  value={formData.releaseYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, releaseYear: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUploadArea
                type="video"
                accept="video/*"
                icon={<Film className="w-8 h-8 text-netflix-red" />}
                title="Video File *"
                description="MP4, MOV, AVI (Max 2GB)"
              />
              <FileUploadArea
                type="poster"
                accept="image/*"
                icon={<Image className="w-8 h-8 text-netflix-red" />}
                title="Poster Image *"
                description="JPG, PNG (Recommended: 400x600)"
              />
              <FileUploadArea
                type="backdrop"
                accept="image/*"
                icon={<FileText className="w-8 h-8 text-netflix-red" />}
                title="Backdrop Image"
                description="JPG, PNG (Recommended: 1920x1080)"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Content</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="mb-6">
              {uploadProgress.status === 'uploading' && (
                <Upload className="w-16 h-16 text-netflix-red mx-auto animate-pulse" />
              )}
              {uploadProgress.status === 'processing' && (
                <Film className="w-16 h-16 text-netflix-red mx-auto animate-spin" />
              )}
              {uploadProgress.status === 'complete' && (
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">✓</span>
                </div>
              )}
              {uploadProgress.status === 'error' && (
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">✗</span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              {uploadProgress.status === 'uploading' && 'Uploading...'}
              {uploadProgress.status === 'processing' && 'Processing...'}
              {uploadProgress.status === 'complete' && 'Upload Complete!'}
              {uploadProgress.status === 'error' && 'Upload Failed'}
            </h3>

            <p className="text-gray-400 mb-4">{uploadProgress.message}</p>

            {uploadProgress.status !== 'complete' && uploadProgress.status !== 'error' && (
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.progress}%` }}
                />
              </div>
            )}

            {uploadProgress.status === 'error' && (
              <button
                onClick={() => setUploadProgress({ progress: 0, status: 'idle' })}
                className="btn-primary"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};