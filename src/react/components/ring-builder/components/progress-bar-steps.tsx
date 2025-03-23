import { DiamondIcon, RingIcon, RingSettingIcon } from '../../svg';
import { Step } from '../types';

export const steps: Step[] = [
  {
    id: '1',
    name: 'Ring Setting',
    description: 'Select and customize your setting',
    href: '/collections/engagement-ring',
    status: 'current',
    icon: <RingSettingIcon />,
  },
  {
    id: '2',
    name: 'Diamond',
    description: 'Select your diamond',
    href: '#',
    status: 'upcoming',
    icon: <DiamondIcon />,
  },
  {
    id: '3',
    name: 'Review',
    description: 'Confirm and finalise your ring',
    href: '#',
    status: 'upcoming',
    icon: <RingIcon />,
  },
];
