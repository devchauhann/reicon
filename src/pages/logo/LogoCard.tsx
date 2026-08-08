import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HighlightItem } from '../../components/ui/Highlight';
import { IconTooltipTrigger } from '../../components/ui/IconTooltip';
import { LogoItem } from '../../lib/logo-data';

interface LogoCardProps {
  item: LogoItem;
  size?: number;
}

function LogoCard({ item, size = 32 }: LogoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const mainUrl = item.url;

  return (
    <HighlightItem value={`${item.slug}-logo`}>
      <IconTooltipTrigger label={item.name} side="bottom" sideOffset={14}>
        <Link
          to={`/logo/${item.slug}`}
          className="cv-auto group relative flex items-center justify-center aspect-square bg-text-base/3 border border-text-base/6 hover:border-text-base/20 rounded-xl transition-all cursor-pointer p-2 overflow-hidden"
          title={item.name}
        >
          {/* Skeleton Placeholder */}
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-md bg-text-base/7 animate-pulse"
                style={{ width: size, height: size }}
              />
            </div>
          )}

          {!error && (
            <img
              src={mainUrl}
              alt={item.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={`object-contain transition-all duration-150 ${
                loaded
                  ? 'opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-150'
                  : 'opacity-0'
              }`}
              style={{ width: size, height: size, maxWidth: '80%', maxHeight: '80%' }}
            />
          )}

          {error && (
            <div className="text-[10px] text-text-base/40 text-center select-none font-mono px-0.5 truncate">
              {item.name}
            </div>
          )}
        </Link>
      </IconTooltipTrigger>
    </HighlightItem>
  );
}

export default memo(LogoCard);

export const LogoCardSkeleton = memo(function LogoCardSkeleton({ size = 32 }: { size?: number }) {
  return (
    <div
      className="cv-auto flex items-center justify-center aspect-square bg-text-base/3 border border-text-base/6 rounded-xl p-2"
      aria-hidden="true"
    >
      <div
        className="rounded-md bg-text-base/7 animate-pulse"
        style={{ width: size, height: size }}
      />
    </div>
  );
});
