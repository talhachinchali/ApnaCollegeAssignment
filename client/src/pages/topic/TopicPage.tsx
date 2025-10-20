import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useTopic,
  useTopicProgress,
  useUpdateProgress,
} from "@/hooks/useTopics";
import { useCurrentUser } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  BookOpen,
  Code,
  FileText,
} from "lucide-react";

export default function TopicPage() {
  const { topicId } = useParams({ from: "/topic/$topicId" });
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: topic, isLoading: topicLoading } = useTopic(topicId);
  const { data: progress, isLoading: progressLoading } =
    useTopicProgress(topicId);
  const updateProgressMutation = useUpdateProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, userLoading, navigate]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isProblemCompleted = (problemId: string) => {
    return (
      progress?.some((p) => p.problemId === problemId && p.completed) || false
    );
  };

  const handleProgressUpdate = (problemId: string, completed: boolean) => {
    updateProgressMutation.mutate({
      topicId,
      problemId,
      completed,
    });
  };

  if (userLoading || topicLoading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Topic not found
          </h1>
          <Link to="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedCount = progress?.filter((p) => p.completed).length || 0;
  const totalCount = topic.problems.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{topic.title}</h1>
              <p className="text-sm text-gray-600">{topic.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress
                </span>
                <span className="text-sm text-gray-600">
                  {completedCount}/{totalCount} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {progressPercentage}% complete
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Problems</h2>
          <div className="space-y-4">
            {topic.problems.map((problem, index) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`transition-all duration-200 ${
                    isProblemCompleted(problem._id)
                      ? "bg-primary/5 border-primary/20"
                      : "hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Checkbox
                          checked={isProblemCompleted(problem._id)}
                          onCheckedChange={(checked) =>
                            handleProgressUpdate(problem._id, !!checked)
                          }
                          disabled={updateProgressMutation.isPending}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {problem.order}. {problem.title}
                            </h3>
                            <Badge
                              className={getDifficultyColor(problem.difficulty)}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {problem.description}
                          </p>

                          {/* Action Links */}
                          <div className="flex flex-wrap gap-2">
                            {problem.youtubeLink && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={problem.youtubeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Play className="h-4 w-4 mr-2" />
                                  Video
                                </a>
                              </Button>
                            )}
                            {problem.leetcodeLink && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={problem.leetcodeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Code className="h-4 w-4 mr-2" />
                                  LeetCode
                                </a>
                              </Button>
                            )}
                            {problem.codeforcesLink && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={problem.codeforcesLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Code className="h-4 w-4 mr-2" />
                                  Codeforces
                                </a>
                              </Button>
                            )}
                            {problem.articleLink && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={problem.articleLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Article
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {isProblemCompleted(problem._id) && (
                        <div className="ml-4">
                          <div className="flex items-center text-primary">
                            <span className="text-sm font-medium">
                              ✓ Completed
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
