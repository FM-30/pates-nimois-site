"use client";
import { useEffect } from 'react';

export default function AccessibilityChecker() {
  useEffect(() => {
    // Vérifications d'accessibilité
    const checkAccessibility = () => {
      const issues: string[] = [];

      // Vérifier les contrastes de couleurs
      const checkColorContrast = () => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
          const style = window.getComputedStyle(element);
          const backgroundColor = style.backgroundColor;
          const color = style.color;
          
          // Vérification basique du contraste (simplifiée)
          if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            // Ici on pourrait implémenter un algorithme de calcul de contraste
            // Pour l'instant, on se contente de vérifier que les couleurs sont définies
          }
        });
      };

      // Vérifier les attributs alt des images
      const checkImageAlt = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.alt && !img.getAttribute('aria-label')) {
            issues.push(`Image sans alt: ${img.src}`);
          }
        });
      };

      // Vérifier la structure des headings
      const checkHeadingStructure = () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        headings.forEach(heading => {
          const level = parseInt(heading.tagName.charAt(1));
          if (level > previousLevel + 1) {
            issues.push(`Saut de niveau de heading: ${heading.tagName} après h${previousLevel}`);
          }
          previousLevel = level;
        });
      };

      // Vérifier les liens
      const checkLinks = () => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          const text = link.textContent?.trim();
          const href = link.getAttribute('href');
          
          if (!text && !link.querySelector('img[alt]')) {
            issues.push('Lien sans texte accessible');
          }
          
          if (href === '#' || href === '') {
            issues.push('Lien vide ou placeholder');
          }
        });
      };

      // Vérifier les formulaires
      const checkForms = () => {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          const id = input.getAttribute('id');
          const name = input.getAttribute('name');
          const type = input.getAttribute('type');
          
          if (type !== 'hidden' && type !== 'submit' && type !== 'button') {
            if (!id && !name) {
              issues.push('Champ de formulaire sans id ou name');
            }
            
            // Vérifier les labels
            if (id) {
              const label = document.querySelector(`label[for="${id}"]`);
              if (!label) {
                issues.push(`Champ sans label: ${id}`);
              }
            }
          }
        });
      };

      // Vérifier les boutons
      const checkButtons = () => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          const text = button.textContent?.trim();
          const ariaLabel = button.getAttribute('aria-label');
          const ariaLabelledby = button.getAttribute('aria-labelledby');
          
          if (!text && !ariaLabel && !ariaLabelledby) {
            issues.push('Bouton sans texte accessible');
          }
        });
      };

      // Vérifier les landmarks
      const checkLandmarks = () => {
        const landmarks = document.querySelectorAll('header, nav, main, aside, footer, [role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]');
        
        if (landmarks.length === 0) {
          issues.push('Aucun landmark détecté');
        }
        
        // Vérifier les rôles ARIA
        const elementsWithRole = document.querySelectorAll('[role]');
        elementsWithRole.forEach(element => {
          const role = element.getAttribute('role');
          const validRoles = ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'search', 'form', 'region', 'article', 'section'];
          
          if (role && !validRoles.includes(role)) {
            issues.push(`Rôle ARIA invalide: ${role}`);
          }
        });
      };

      // Vérifier le focus visible
      const checkFocusVisible = () => {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
          const style = window.getComputedStyle(element);
          const outline = style.outline;
          const outlineOffset = style.outlineOffset;
          
          if (outline === 'none' && outlineOffset === '0px') {
            // Vérifier s'il y a une alternative pour le focus
            const boxShadow = style.boxShadow;
            const border = style.border;
            
            if (!boxShadow && !border) {
              issues.push('Élément focusable sans indicateur de focus visible');
            }
          }
        });
      };

      // Vérifier les animations
      const checkAnimations = () => {
        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(element => {
          const style = window.getComputedStyle(element);
          const animation = style.animation;
          const transition = style.transition;
          
          if (animation !== 'none' || transition !== 'all 0s ease 0s') {
            // Vérifier si l'utilisateur préfère les animations réduites
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
              issues.push('Animations détectées alors que l\'utilisateur préfère les réduire');
            }
          }
        });
      };

      // Exécuter toutes les vérifications
      checkColorContrast();
      checkImageAlt();
      checkHeadingStructure();
      checkLinks();
      checkForms();
      checkButtons();
      checkLandmarks();
      checkFocusVisible();
      checkAnimations();

      // Afficher les résultats
      if (issues.length > 0) {
        console.group('🔍 Vérifications d\'accessibilité');
        console.warn(`${issues.length} problème(s) d'accessibilité détecté(s):`);
        issues.forEach(issue => console.warn(`- ${issue}`));
        console.groupEnd();
      } else {
        console.log('✅ Aucun problème d\'accessibilité détecté');
      }
    };

    // Exécuter les vérifications après le chargement
    if (document.readyState === 'complete') {
      checkAccessibility();
    } else {
      window.addEventListener('load', checkAccessibility);
    }

    // Vérifications en temps réel pour les changements dynamiques
    const observer = new MutationObserver(() => {
      // Vérifications limitées pour les changements dynamiques
      const checkDynamicAccessibility = () => {
        const issues: string[] = [];
        
        // Vérifier les nouveaux éléments
        const newImages = document.querySelectorAll('img:not([data-accessibility-checked])');
        newImages.forEach(img => {
          const imgElement = img as HTMLImageElement;
          if (!imgElement.alt && !imgElement.getAttribute('aria-label')) {
            issues.push(`Nouvelle image sans alt: ${imgElement.src}`);
          }
          imgElement.setAttribute('data-accessibility-checked', 'true');
        });
        
        if (issues.length > 0) {
          console.warn('Problèmes d\'accessibilité détectés dans le contenu dynamique:', issues);
        }
      };
      
      checkDynamicAccessibility();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['alt', 'aria-label', 'role']
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('load', checkAccessibility);
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
}

// Hook pour les tests d'accessibilité
export function useAccessibilityTests() {
  useEffect(() => {
    // Tests spécifiques pour les composants
    const runComponentTests = () => {
      // Test de navigation au clavier
      const testKeyboardNavigation = () => {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        console.log(`Nombre d'éléments focusables: ${focusableElements.length}`);
      };

      // Test de lecture d'écran
      const testScreenReader = () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const images = document.querySelectorAll('img');
        const links = document.querySelectorAll('a');
        
        console.log(`Structure de la page:
          - Titres: ${headings.length}
          - Images: ${images.length}
          - Liens: ${links.length}`);
      };

      testKeyboardNavigation();
      testScreenReader();
    };

    // Exécuter les tests après un délai pour laisser le temps au contenu de se charger
    const timeoutId = setTimeout(runComponentTests, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
} 