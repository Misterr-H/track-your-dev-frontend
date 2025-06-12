import { Store } from 'pullstate';

interface AppState {
  selectedOrg: string;
}

export const AppStore = new Store<AppState>({
  selectedOrg: '',
});

export const setSelectedOrg = (org: string) => {
  AppStore.update((s) => {
    s.selectedOrg = org;
  });
}; 