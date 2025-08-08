import React from 'react';
import dynamic from 'next/dynamic';
import type { TemplateConfig, TemplateId } from '@/types/wedding-template';

// Dynamically import templates for better performance
const Template001 = dynamic(() => import('@/components/templates/template001'), {
  loading: () => React.createElement('div', null, 'Loading template...'),
});

const Template002 = dynamic(() => import('@/components/templates/template002'), {
  loading: () => React.createElement('div', null, 'Loading template...'),
});

// Template registry
export const templates: Record<TemplateId, TemplateConfig> = {
  template001: {
    id: 'template001',
    name: 'Elegant Romance',
    description: 'A beautiful, romantic template with soft colors and elegant typography',
    thumbnail: '/templates/template001-thumbnail.jpg',
    component: Template001,
  },
  template002: {
    id: 'template002',
    name: 'Modern Minimalist',
    description: 'Clean and modern design with minimalist aesthetics',
    thumbnail: '/templates/template002-thumbnail.jpg',
    component: Template002,
  },
  template003: {
    id: 'template003',
    name: 'Traditional Heritage',
    description: 'Traditional design with cultural elements and rich colors',
    thumbnail: '/templates/template003-thumbnail.jpg',
    component: Template001, // Placeholder - will be replaced with Template003
  },
};

export function getTemplate(templateId: TemplateId): TemplateConfig {
  return templates[templateId] || templates.template001;
}