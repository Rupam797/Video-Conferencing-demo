import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, Users, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const scheduleSchema = z.object({
  meetingTitle: z.string().min(3, {
    message: "Meeting title must be at least 3 characters.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  duration: z.string().min(1, {
    message: "Please select a duration.",
  }),
  participants: z.string().optional(),
  description: z.string().optional(),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ScheduleMeetingProps {
  onSchedule?: (values: ScheduleFormValues) => void;
}

const ScheduleMeeting = ({
  onSchedule = (values) => console.log("Meeting scheduled:", values),
}: ScheduleMeetingProps) => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      meetingTitle: "",
      date: "",
      time: "",
      duration: "30",
      participants: "",
      description: "",
    },
  });

  const handleSubmit = (values: ScheduleFormValues) => {
    onSchedule(values);
    form.reset();
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">Schedule a Meeting</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="meetingTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <Video size={18} />
                    </div>
                    <Input
                      placeholder="Weekly Team Sync"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <Calendar size={18} />
                      </div>
                      <Input type="date" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <Clock size={18} />
                      </div>
                      <Input type="time" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...field}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participants</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <Users size={18} />
                    </div>
                    <Input
                      placeholder="Email addresses (comma separated)"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Enter email addresses separated by commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Meeting agenda or additional information"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Schedule Meeting
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ScheduleMeeting;
