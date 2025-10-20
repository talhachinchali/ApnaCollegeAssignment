import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../api/auth";

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem("token"),
    initialData: () => {
      const user = localStorage.getItem("user");
      return user ? { user: JSON.parse(user) } : undefined;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
    window.location.href = "/login";
  };
};
