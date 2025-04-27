export interface MenuItem {
  label: string;
  icon: string;
  badge: string | undefined;
  items: MenuItem[] | undefined;
  path: string;
}
