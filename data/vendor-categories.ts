export interface VendorSubCategory {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'archived';
}

export interface VendorCategory {
  id: string;
  name: string;
  slug: string;
  subCategories: VendorSubCategory[];
  status: 'active' | 'archived';
}

export interface VendorCategoriesData {
  vendorId: string;
  categories: VendorCategory[];
}

export const VENDOR_CATEGORIES: VendorCategoriesData[] = [
  {
    vendorId: 'v1', // Apple Store NP
    categories: [
      {
        id: 'vc1',
        name: 'iPhone',
        slug: 'iphone',
        status: 'active',
        subCategories: [
          { id: 'vsc1', name: 'iPhone 15 Series', slug: 'iphone-15', status: 'active' },
          { id: 'vsc2', name: 'iPhone 14 Series', slug: 'iphone-14', status: 'active' },
          { id: 'vsc3', name: 'iPhone SE', slug: 'iphone-se', status: 'active' },
        ]
      },
      {
        id: 'vc2',
        name: 'Mac',
        slug: 'mac',
        status: 'active',
        subCategories: [
          { id: 'vsc4', name: 'MacBook Air', slug: 'macbook-air', status: 'active' },
          { id: 'vsc5', name: 'MacBook Pro', slug: 'macbook-pro', status: 'active' },
          { id: 'vsc6', name: 'iMac', slug: 'imac', status: 'active' },
        ]
      },
      {
        id: 'vc3',
        name: 'iPad',
        slug: 'ipad',
        status: 'active',
        subCategories: [
          { id: 'vsc7', name: 'iPad Pro', slug: 'ipad-pro', status: 'active' },
          { id: 'vsc8', name: 'iPad Air', slug: 'ipad-air', status: 'active' },
        ]
      }
    ]
  },
  {
    vendorId: 'v2', // Himalayan Bakery
    categories: [
      {
        id: 'vc4',
        name: 'Bread',
        slug: 'bread',
        status: 'active',
        subCategories: [
          { id: 'vsc9', name: 'Sourdough', slug: 'sourdough', status: 'active' },
          { id: 'vsc10', name: 'Whole Wheat', slug: 'whole-wheat', status: 'active' },
        ]
      },
      {
        id: 'vc5',
        name: 'Pastries',
        slug: 'pastries',
        status: 'active',
        subCategories: [
          { id: 'vsc11', name: 'Croissants', slug: 'croissants', status: 'active' },
          { id: 'vsc12', name: 'Danishes', slug: 'danishes', status: 'active' },
        ]
      }
    ]
  }
];
