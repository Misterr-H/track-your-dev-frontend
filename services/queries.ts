import { useQuery } from '@tanstack/react-query';
import { fetchOrgsAndRepos } from './apis/dashboardApis';
import { DashboardResponse } from '@/types/dashboard';

export const QUERY_KEYS = {
  DASHBOARD: {
    ORGS_AND_REPOS: 'dashboard-orgs-and-repos',
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
