import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const accountSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
});

type AccountFormValues = z.infer<typeof accountSchema>;
type ProfileFormValues = z.infer<typeof profileSchema>;

interface RegisterFormProps {
  onSubmit?: (values: AccountFormValues | ProfileFormValues) => void;
  onLoginClick?: () => void;
}

const RegisterForm = ({
  onSubmit = (values) => console.log(values),
  onLoginClick = () => console.log("Login clicked"),
}: RegisterFormProps) => {
  const [activeTab, setActiveTab] = useState<"account" | "profile">("account");

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const handleAccountSubmit = (values: AccountFormValues) => {
    setActiveTab("profile");
    onSubmit(values);
  };

  const handleProfileSubmit = (values: ProfileFormValues) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-2">Create an account</h2>
      <p className="text-center text-gray-500 mb-6">
        Enter your information to create an account
      </p>

      <div className="grid grid-cols-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("account")}
          className={`py-2 text-center rounded-l-md ${activeTab === "account" ? "bg-gray-100 font-medium" : "bg-gray-50 text-gray-500"}`}
        >
          Account
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`py-2 text-center rounded-r-md ${activeTab === "profile" ? "bg-gray-100 font-medium" : "bg-gray-50 text-gray-500"}`}
        >
          Profile
        </button>
      </div>

      {activeTab === "account" && (
        <Form {...accountForm}>
          <form
            onSubmit={accountForm.handleSubmit(handleAccountSubmit)}
            className="space-y-6"
          >
            <FormField
              control={accountForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={accountForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={accountForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] mt-4"
            >
              Next
            </Button>
          </form>
        </Form>
      )}

      {activeTab === "profile" && (
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
            className="space-y-6"
          >
            <FormField
              control={profileForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] mt-4"
            >
              Create account
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          className="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
