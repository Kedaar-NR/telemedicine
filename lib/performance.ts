import React from 'react';

// Performance optimization utilities for the telemedicine platform

// Lazy loading utility for components
export function createLazyComponent<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = React.lazy(factory);
  
  return function WrappedComponent(props: React.ComponentProps<T>) {
    return React.createElement(
      React.Suspense,
      { fallback: fallback ? React.createElement(fallback) : React.createElement('div', {}, 'Loading...') },
      React.createElement(LazyComponent, props)
    );
  };
}

// Memoization wrapper for expensive calculations
export function memoize<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const cache = new Map();
  
  return (...args: Args): Return => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Debounce function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function for rate limiting
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Virtual scrolling utility for large lists
export function calculateVisibleItems(
  containerHeight: number,
  itemHeight: number,
  scrollTop: number,
  totalItems: number,
  overscan: number = 3
) {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount + overscan * 2);
  
  return {
    startIndex,
    endIndex,
    visibleCount,
    offsetY: startIndex * itemHeight
  };
}

// Image optimization utility
export function optimizeImageSrc(
  src: string,
  width?: number,
  height?: number,
  quality: number = 75
): string {
  if (!src) return '';
  
  // For Next.js Image component or external image optimization service
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  
  // This would be replaced with actual image optimization service URL
  return `${src}?${params.toString()}`;
}

// Bundle size analyzer utility
export function analyzeComponentSize(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Analyzing component: ${componentName}`);
    
    // This would integrate with webpack-bundle-analyzer or similar
    return {
      name: componentName,
      size: Math.random() * 100, // Mock size in KB
      loadTime: Math.random() * 500 // Mock load time in ms
    };
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as unknown as { memory: any }).memory;
    
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  
  return null;
}

// Critical resource hints
export function addResourceHints() {
  if (typeof document === 'undefined') return;
  
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'modulepreload', href: '/api/auth/session' }
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.assign(link, hint);
    document.head.appendChild(link);
  });
}
