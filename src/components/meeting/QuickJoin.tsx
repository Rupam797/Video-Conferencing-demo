import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Video, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const meetingSchema = z.object({
  meetingId: z.string().min(6, {
    message: "Meeting ID must be at least 6 characters.",
  }),
});

type QuickJoinFormValues = z.infer<typeof meetingSchema>;

interface QuickJoinProps {
  onJoin?: (meetingId: string) => void;
}

const QuickJoin = ({
  onJoin = (meetingId) => console.log(`Joining meeting: ${meetingId}`),
}: QuickJoinProps) => {
  const form = useForm<QuickJoinFormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      meetingId: "",
    },
  });

  const handleSubmit = (values: QuickJoinFormValues) => {
    onJoin(values.meetingId);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Video className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Join a Meeting</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="meetingId"
            render={({ field }) => (
              <FormItem>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Enter meeting ID"
                      className="flex-1"
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Join
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Need to start a new meeting instead?
        <button
          type="button"
          className="text-primary hover:underline ml-1"
          onClick={() => console.log("Create new meeting clicked")}
        >
          Start a meeting
        </button>
      </p>
    </div>
  );
};

export default QuickJoin;
