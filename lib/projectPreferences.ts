const TASK_PREFERENCES_KEY = 'project_task_preferences';

export interface ProjectTaskPreference {
  orgName: string;
  repoName: string;
  enabled: boolean;
}

export const getProjectTaskPreferences = (): ProjectTaskPreference[] => {
  if (typeof window === 'undefined') return [];
  const preferences = localStorage.getItem(TASK_PREFERENCES_KEY);
  return preferences ? JSON.parse(preferences) : [];
};

export const isProjectTasksEnabled = (orgName: string, repoName: string): boolean => {
  const preferences = getProjectTaskPreferences();
  return preferences.some(
    pref => pref.orgName === orgName && pref.repoName === repoName && pref.enabled
  );
};

export const toggleProjectTasks = (orgName: string, repoName: string): void => {
  const preferences = getProjectTaskPreferences();
  const existingIndex = preferences.findIndex(
    pref => pref.orgName === orgName && pref.repoName === repoName
  );

  if (existingIndex >= 0) {
    preferences[existingIndex].enabled = !preferences[existingIndex].enabled;
  } else {
    preferences.push({ orgName, repoName, enabled: true });
  }

  localStorage.setItem(TASK_PREFERENCES_KEY, JSON.stringify(preferences));
}; 