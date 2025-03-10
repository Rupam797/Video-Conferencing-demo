import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  defaultOpen?: boolean;
  defaultTab?: "login" | "register";
  trigger?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onLoginSuccess?: (data: any) => void;
  onRegisterSuccess?: (data: any) => void;
}

const AuthModal = ({
  defaultOpen = false,
  defaultTab = "login",
  trigger,
  onOpenChange,
  onLoginSuccess = (data) => console.log("Login success:", data),
  onRegisterSuccess = (data) => console.log("Register success:", data),
}: AuthModalProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const handleLoginSubmit = (values: any) => {
    onLoginSuccess(values);
    handleOpenChange(false);
  };

  const handleRegisterSubmit = (values: any) => {
    onRegisterSuccess(values);
    handleOpenChange(false);
  };

  const handleSwitchToLogin = () => {
    setActiveTab("login");
  };

  const handleSwitchToRegister = () => {
    setActiveTab("register");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline">Sign In</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white p-0 overflow-hidden">
        <div className="relative">
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          <div className="p-6">
            <Tabs
              defaultValue={activeTab}
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "login" | "register")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  onForgotPassword={() =>
                    console.log("Forgot password clicked")
                  }
                />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm
                  onSubmit={handleRegisterSubmit}
                  onLoginClick={handleSwitchToLogin}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
