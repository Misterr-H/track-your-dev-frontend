import { useQuery } from '@tanstack/react-query';
import { fetchOrgsAndRepos, fetchTasks } from './apis/dashboardApis';
import { DashboardResponse, TaskResponse } from '@/types/dashboard';

export const QUERY_KEYS = {
  DASHBOARD: {
    ORGS_AND_REPOS: 'dashboard-orgs-and-repos',
    TASKS: 'dashboard-tasks',
  },
} as const;

export function useOrgsAndRepos() {
  return useQuery<DashboardResponse>({
    queryKey: [QUERY_KEYS.DASHBOARD.ORGS_AND_REPOS],
    queryFn: fetchOrgsAndRepos,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

export function useTasks(orgName: string, repoName: string, options?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery<TaskResponse>({
    queryKey: [QUERY_KEYS.DASHBOARD.TASKS, orgName, repoName, options],
    queryFn: () => fetchTasks(orgName, repoName, options),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}