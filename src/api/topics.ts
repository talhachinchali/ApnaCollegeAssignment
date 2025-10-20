import api from "../lib/api";

export interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  youtubeLink?: string;
  leetcodeLink?: string;
  codeforcesLink?: string;
  articleLink?: string;
  order: number;
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
  problems: Problem[];
  order: number;
  createdAt: string;
}

// Topics API functions
export const topicsApi = {
  getTopics: async (): Promise<Topic[]> => {
    const response = await api.get("/topics");
    return response.data;
  },

  getTopic: async (id: string): Promise<Topic> => {
    const response = await api.get(`/topics/${id}`);
    return response.data;
  },
};
