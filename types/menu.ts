export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[]; // Recursively defines submenu as an array of Menu items
};
