"use client";
import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Surveillance des Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        // Envoyer les données à Google Analytics ou autre service
        if (lcp < 2500) {
          console.log('✅ LCP excellent:', lcp.toFixed(2), 'ms');
        } else if (lcp < 4000) {
          console.log('⚠️ LCP à améliorer:', lcp.toFixed(2), 'ms');
        } else {
          console.log('❌ LCP critique:', lcp.toFixed(2), 'ms');
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          
          if (fid < 100) {
            console.log('✅ FID excellent:', fid.toFixed(2), 'ms');
          } else if (fid < 300) {
            console.log('⚠️ FID à améliorer:', fid.toFixed(2), 'ms');
          } else {
            console.log('❌ FID critique:', fid.toFixed(2), 'ms');
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        if (clsValue < 0.1) {
          console.log('✅ CLS excellent:', clsValue.toFixed(3));
        } else if (clsValue < 0.25) {
          console.log('⚠️ CLS à améliorer:', clsValue.toFixed(3));
        } else {
          console.log('❌ CLS critique:', clsValue.toFixed(3));
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[0].startTime;
        
        if (fcp < 1800) {
          console.log('✅ FCP excellent:', fcp.toFixed(2), 'ms');
        } else if (fcp < 3000) {
          console.log('⚠️ FCP à améliorer:', fcp.toFixed(2), 'ms');
        } else {
          console.log('❌ FCP critique:', fcp.toFixed(2), 'ms');
        }
      });
      
      fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });

      // TTFB (Time to First Byte)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;
            
            if (ttfb < 800) {
              console.log('✅ TTFB excellent:', ttfb.toFixed(2), 'ms');
            } else if (ttfb < 1800) {
              console.log('⚠️ TTFB à améliorer:', ttfb.toFixed(2), 'ms');
            } else {
              console.log('❌ TTFB critique:', ttfb.toFixed(2), 'ms');
            }
          }
        });
      });
      
      navigationObserver.observe({ entryTypes: ['navigation'] });
    }

    // Préchargement des ressources critiques
    const preloadCriticalResources = () => {
      // Précharger les images critiques
      const criticalImages = [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Précharger les polices critiques
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    };

    // Optimisation du scroll
    const optimizeScroll = () => {
      let ticking = false;
      
      const updateScroll = () => {
        // Optimisations basées sur le scroll
        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateScroll);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
    };

    // Optimisation des images
    const optimizeImages = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Service Worker pour le cache
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker enregistré:', registration);
        } catch (error) {
          console.log('Échec de l\'enregistrement du Service Worker:', error);
        }
      }
    };

    // Initialisation des optimisations
    preloadCriticalResources();
    optimizeScroll();
    optimizeImages();
    registerServiceWorker();

    // Nettoyage
    return () => {
      // Nettoyage des observers si nécessaire
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
}

// Hook personnalisé pour les métriques de performance
export function usePerformanceMetrics() {
  useEffect(() => {
    // Métriques personnalisées
    const measurePageLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download: navigation.responseEnd - navigation.responseStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        };

        console.log('📊 Métriques de performance:', metrics);
        
        // Envoyer à Google Analytics si disponible
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'performance_metrics', {
            custom_map: {
              dns_time: 'dns',
              tcp_time: 'tcp',
              ttfb_time: 'ttfb',
              download_time: 'download',
              dom_content_loaded: 'domContentLoaded',
              load_complete: 'loadComplete',
            },
            value: metrics.loadComplete,
          });
        }
      }
    };

    // Mesurer après le chargement complet
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
    }

    return () => {
      window.removeEventListener('load', measurePageLoad);
    };
  }, []);
} 