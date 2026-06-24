import { FC, useState } from 'react';
import { Heart, Share2 } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  isLiked?: boolean;
  onLike?: (liked: boolean) => void;
  onShare?: () => void;
  onImageLoad?: () => void;
}

const ArticleCard: FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl,
  isLiked = false,
  onLike,
  onShare,
  onImageLoad,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    onLike?.(newLiked);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad?.();
  };

  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800">
      {imageUrl && (
        <div className="relative h-48 bg-gray-700 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && <div className="absolute inset-0 bg-gray-700 animate-pulse" />}
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              liked
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            aria-label={liked ? 'Unlike article' : 'Like article'}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
            <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            aria-label="Share article"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
