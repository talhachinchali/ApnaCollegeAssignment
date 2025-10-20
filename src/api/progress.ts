import api from "../lib/api";

export interface Progress {
  _id: string;
  userId: string;
  topicId: string;
  problemId: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface ProgressStats {
  totalProblems: number;
  completedProblems: number;
  completionPercentage: number;
}

// Progress API functions
export const progressApi = {
  getProgress: async (): Promise<Progress[]> => {
    const response = await api.get("/progress");
    return response.data;
  },

  getTopicProgress: async (topicId: string): Promise<Progress[]> => {
    const response = await api.get(`/progress/topic/${topicId}`);
    return response.data;
  },

  updateProgress: async (data: {
    topicId: string;
    problemId: string;
    completed: boolean;
  }): Promise<Progress> => {
    const response = await api.post("/progress/update", data);
    return response.data;
  },

  getStats: async (): Promise<ProgressStats> => {
    const response = await api.get("/progress/stats");
    return response.data;
  },
};
