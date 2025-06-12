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

export interface CommitSummary {
  filename: string;
  summary: string;
}

export interface CommitTask {
  title: string;
  description: string;
}

export interface CommitTasks {
  technicalTasks: CommitTask[];
  nonTechnicalTasks: CommitTask[];
}

export interface Commit {
  _id: string;
  commitMessage: string;
  commitTime: string;
  additions: number;
  deletions: number;
  changes: number;
  summaries: CommitSummary[];
  tasks: CommitTasks;
  author: string;
}

export interface TaskResponse {
  success: boolean;
  message: string;
  data: {
    commits: Commit[];
    totalCommits: number;
    page: number;
    pageSize: number;
    source: 'database' | 'github';
  };
} 