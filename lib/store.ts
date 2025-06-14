import { Store } from 'pullstate';

interface AppState {
  selectedOrg: string;
  isAuthenticated: boolean;
}

export const AppStore = new Store<AppState>({
  selectedOrg: '',
  isAuthenticated: false,
});

export const setSelectedOrg = (org: string) => {
  AppStore.update((s) => {
    s.selectedOrg = org;
  });
}; 

export const setIsAuthenticated = (isAuthenticated: boolean) => {
  AppStore.update((s) => {
    s.isAuthenticated = isAuthenticated;
  });
};