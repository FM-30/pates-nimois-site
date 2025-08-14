"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fallback image en cas d'erreur
  const fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EImage non disponible%3C/text%3E%3C/svg%3E";

  // Optimiser l'URL pour WebP si supporté
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('data:')) return originalSrc;
    
    // Pour les images Unsplash, ajouter les paramètres d'optimisation
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
    
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(hasError ? fallbackSrc : src);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: fill ? undefined : `${width}/${height}`,
        ...style
      }}
    >
      {/* Placeholder pour éviter le CLS */}
      {!isLoaded && !priority && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ aspectRatio: fill ? undefined : `${width}/${height}` }}
        />
      )}
      
      <Image
        src={optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        fill={fill}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
      
      {/* Skeleton loader pour les images non prioritaires */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  );
}

// Composant pour les images de fond optimisées
export function OptimizedBackgroundImage({
  src,
  alt,
  className = "",
  children,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        fill
        className="object-cover"
        priority
        {...props}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Composant pour les images responsives avec breakpoints
export function ResponsiveImage({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  breakpoints?: Record<string, number>;
}) {
  const sizes = Object.entries(breakpoints)
    .map(([breakpoint, width]) => `(min-width: ${width}px) ${width}px`)
    .join(', ');

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      {...props}
    />
  );
} 