import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  topicsApi,
  progressApi,
  Topic,
  Problem,
  Progress,
  ProgressStats,
} from "../api";

// Topics hooks
export const useTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: topicsApi.getTopics,
  });
};

export const useTopic = (id: string) => {
  return useQuery({
    queryKey: ["topic", id],
    queryFn: () => topicsApi.getTopic(id),
    enabled: !!id,
  });
};

// Progress hooks
export const useProgress = () => {
  return useQuery({
    queryKey: ["progress"],
    queryFn: progressApi.getProgress,
  });
};

export const useTopicProgress = (topicId: string) => {
  return useQuery({
    queryKey: ["progress", topicId],
    queryFn: () => progressApi.getTopicProgress(topicId),
    enabled: !!topicId,
  });
};

export const useProgressStats = () => {
  return useQuery({
    queryKey: ["progress", "stats"],
    queryFn: progressApi.getStats,
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: progressApi.updateProgress,
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["progress", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["progress", data.topicId] });
    },
  });
};
