import { DashboardResponse } from '@/types/dashboard';
import { axiosInstance } from './axiosInstance';

export const fetchOrgsAndRepos = async (): Promise<DashboardResponse> => {
  const response = await axiosInstance.get("/api/preview");
  return response.data;
};