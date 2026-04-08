export type FeatureStatus = 'live' | 'planned' | 'coming-soon';

export type FeatureCategory =
  | 'Core'
  | 'AI'
  | 'Backend'
  | 'Analytics'
  | 'Integrations'
  | 'Security'
  | 'UI';

export interface Feature {
  id: number;
  name: string;
  description: string;
  category: FeatureCategory;
  status: FeatureStatus;
  icon: string;
}
