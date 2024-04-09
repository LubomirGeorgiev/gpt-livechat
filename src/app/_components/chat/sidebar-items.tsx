import {Chip} from '@nextui-org/react';

import {type SidebarItem} from './sidebar';

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */
export const sectionItems: SidebarItem[] = [
  {
    key: 'history',
    title: 'History',
    items: [
      {
        key: 'analytics',
        href: '#',
        icon: 'solar:chart-outline',
        title: 'Analytics',
      },
      {
        key: 'perks',
        href: '/perks',
        icon: 'solar:gift-linear',
        title: 'Perks',
        endContent: (
          <Chip size='sm' variant='flat'>
            3
          </Chip>
        ),
      },
      {
        key: 'expenses',
        href: '#',
        icon: 'solar:bill-list-outline',
        title: 'Expenses',
      },
      {
        key: 'settings',
        href: '/settings',
        icon: 'solar:settings-outline',
        title: 'Settings',
      },
    ],
  },
];
