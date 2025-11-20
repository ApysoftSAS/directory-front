import { useEffect } from 'react';
import { Business } from '../types';
import { useApp } from '../context/AppContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  type?: 'website' | 'article' | 'business.business';
  business?: Business;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  ogImage,
  url,
  type = 'website',
  business,
}) => {
  const { siteConfig } = useApp();

  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    document.title = pageTitle;

    const metaDescription = description || `Encuentra los mejores negocios locales en ${siteConfig.name}`;
    updateMetaTag('description', metaDescription);

    const metaKeywords = keywords.length > 0 
      ? keywords.join(', ') 
      : 'directorio, negocios locales, empresas, servicios, directorio comercial';
    updateMetaTag('keywords', metaKeywords);

    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', metaDescription, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', siteConfig.name, 'property');
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
      updateMetaTag('og:image:alt', pageTitle, 'property');
    }
    
    if (url) {
      updateMetaTag('og:url', url, 'property');
      updateMetaTag('canonical', url);
    }

    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', pageTitle, 'name');
    updateMetaTag('twitter:description', metaDescription, 'name');
    
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage, 'name');
    }

    updateMetaTag('robots', 'index, follow', 'name');
    updateMetaTag('language', 'Spanish', 'name');
    updateMetaTag('revisit-after', '7 days', 'name');

    if (business) {
      const isPremium = business.premium;
      const hasLocations = business.locations && business.locations.length > 0;

      const structuredData: any = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: business.seo?.metaTitle || business.name,
        description: business.seo?.metaDescription || business.description,
        image: business.logo || (business.images && business.images[0]) || '',
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.address,
          addressLocality: business.city,
          addressCountry: business.country,
        },
        telephone: business.phone1,
        email: business.email,
        priceRange: '$$',
        openingHours: business.schedule || 'Mo-Fr 09:00-18:00',
      };

      if (business.website) {
        structuredData.url = business.website.startsWith('http') 
          ? business.website 
          : `https://${business.website}`;
      }

      if (isPremium && business.seo?.keywords && business.seo.keywords.length > 0) {
        structuredData.keywords = business.seo.keywords.join(', ');
      }

      if (hasLocations) {
        structuredData.additionalType = 'Organization';
        structuredData.location = [
          {
            '@type': 'Place',
            name: 'Sede Principal',
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.address,
              addressLocality: business.city,
              addressCountry: business.country,
            }
          },
          ...business.locations!.map(location => ({
            '@type': 'Place',
            name: location.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: location.address,
              addressLocality: location.city,
            },
            telephone: location.phone || business.phone1,
          }))
        ];
      }

      if (business.socialMedia) {
        const socialLinks = [];
        if (business.socialMedia.facebook) socialLinks.push(business.socialMedia.facebook);
        if (business.socialMedia.instagram) socialLinks.push(business.socialMedia.instagram);
        if (business.socialMedia.twitter) socialLinks.push(business.socialMedia.twitter);
        if (business.socialMedia.linkedin) socialLinks.push(business.socialMedia.linkedin);
        
        if (socialLinks.length > 0) {
          structuredData.sameAs = socialLinks;
        }
      }

      let scriptTag = document.getElementById('business-jsonld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'business-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);

      if (isPremium) {
        const breadcrumbData = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: window.location.origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Negocios',
              item: `${window.location.origin}/negocios`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: business.category,
              item: `${window.location.origin}/negocios?category=${encodeURIComponent(business.category)}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: business.name,
              item: window.location.href,
            },
          ],
        };

        let breadcrumbScript = document.getElementById('breadcrumb-jsonld');
        if (!breadcrumbScript) {
          breadcrumbScript = document.createElement('script');
          breadcrumbScript.id = 'breadcrumb-jsonld';
          breadcrumbScript.type = 'application/ld+json';
          document.head.appendChild(breadcrumbScript);
        }
        breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      }
    } else {
      const existingScript = document.getElementById('business-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
      const existingBreadcrumb = document.getElementById('breadcrumb-jsonld');
      if (existingBreadcrumb) {
        existingBreadcrumb.remove();
      }
    }

    const siteStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${window.location.origin}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    let siteScriptTag = document.getElementById('site-jsonld');
    if (!siteScriptTag) {
      siteScriptTag = document.createElement('script');
      siteScriptTag.id = 'site-jsonld';
      siteScriptTag.type = 'application/ld+json';
      document.head.appendChild(siteScriptTag);
    }
    siteScriptTag.textContent = JSON.stringify(siteStructuredData);

    return () => {
      // Cleanup is optional
    };
  }, [title, description, keywords, ogImage, url, type, business, siteConfig]);

  return null;
};

function updateMetaTag(
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
) {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}
