export interface Organization {
  login: string;
  installationId: number;
  id: string;
  name: string;
  avatarUrl: string;
  url: string;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationStats {
  existingRepos: number;
  newRepos: number;
  totalRepos: number;
}

export interface OrganizationResult {
  organization: Organization;
  repositories: Repository[];
  stats: OrganizationStats;
}

export interface DashboardStats {
  total: number;
  successful: number;
  failed: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    results: OrganizationResult[];
    failedResults: any[]; // You might want to type this more specifically if needed
    stats: DashboardStats;
  };
} 