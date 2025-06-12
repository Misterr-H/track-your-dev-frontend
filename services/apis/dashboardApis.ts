import { DashboardResponse, TaskResponse } from '@/types/dashboard';
import { axiosInstance } from './axiosInstance';

export const fetchOrgsAndRepos = async (): Promise<DashboardResponse> => {
  const response = await axiosInstance.get("/api/preview");
  return response.data;
};

export const fetchTasks = async (
  orgName: string,
  repoName: string,
  options?: {
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
  }
): Promise<TaskResponse> => {
  const params = new URLSearchParams();
  if (options?.startDate) params.append('startDate', options.startDate);
  if (options?.endDate) params.append('endDate', options.endDate);
  if (options?.page) params.append('page', options.page.toString());
  if (options?.pageSize) params.append('pageSize', options.pageSize.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await axiosInstance.get(`/api/commits/${orgName}/${repoName}${queryString}`);
  return response.data;
}