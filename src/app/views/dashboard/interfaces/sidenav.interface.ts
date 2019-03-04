export interface NavigationItem {
    name: string;
    url: string;
}

export interface SidenavData {
    username: string;
    navigationItems: NavigationItem[];
}

export interface SidenavConfig {
    data: SidenavData;
}
