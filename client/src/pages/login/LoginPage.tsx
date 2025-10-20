import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";
import { useLogin, useRegister, useCurrentUser } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      registerMutation.mutate({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {isLogin ? (
          <LoginForm
            onSubmit={handleSubmit}
            onToggleMode={() => setIsLogin(false)}
            isLoading={loginMutation.isPending}
            error={loginMutation.error?.response?.data?.message}
          />
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                DSA Sheet
              </CardTitle>
              <CardDescription>
                Create your account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Please wait..." : "Sign Up"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="underline underline-offset-4 hover:text-blue-600"
                >
                  Sign in
                </button>
              </div>

              {registerMutation.error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">
                    {registerMutation.error?.response?.data?.message ||
                      "An error occurred. Please try again."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Master Data Structures & Algorithms with our comprehensive practice
            sheet
          </p>
        </div>
      </motion.div>
    </div>
  );
}
