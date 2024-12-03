import { 
  Users, 
  PenTool, 
  Globe, 
  MessageSquare, 
  BarChart, 
  Wrench 
} from 'lucide-react';

export const services = [
  {
    title: 'Community Management',
    description: 'Gestion et animation de vos réseaux sociaux pour développer votre communauté.',
    icon: Users
  },
  {
    title: 'Web Design',
    description: 'Création de sites web modernes, responsifs et optimisés pour vos utilisateurs.',
    icon: PenTool
  },
  {
    title: 'Maintenance Web',
    description: 'Maintenance et mise à jour régulière de vos sites pour garantir performance et sécurité.',
    icon: Wrench
  },
  {
    title: 'Stratégie Digitale',
    description: 'Élaboration de stratégies digitales personnalisées pour atteindre vos objectifs.',
    icon: Globe
  },
  {
    title: 'Gestion de Contenu',
    description: 'Création et planification de contenus engageants pour vos plateformes.',
    icon: MessageSquare
  },
  {
    title: 'Analyse & Reporting',
    description: 'Suivi et analyse des performances de vos actions digitales.',
    icon: BarChart
  }
];