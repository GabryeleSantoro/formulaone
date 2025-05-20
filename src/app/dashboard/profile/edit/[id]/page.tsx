"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CalendarIcon, User } from "lucide-react";
import { User as UserModel } from "@/lib/models/users";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  dob: z.date().optional(),
});

export default function ProfilePage() {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserModel>();

  var form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      surname: userData?.surname || "",
      username: userData?.username || "",
      email: userData?.email || "",
      dob:
        userData?.dob instanceof Date
          ? userData.dob.toISOString().split("T")[0]
          : userData?.dob,
    },
  });

  useEffect(() => {
    // Fetch user data based on the ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        surname: userData.surname,
        username: userData.username,
        dob:
          userData.dob instanceof Date
            ? userData.dob.toISOString().split("T")[0]
            : userData.dob,
      });
    }
  }, [userData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, surname, username, dob } = values;

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, surname, username, dob }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      toast.success("Profile updated successfully");
    } else if (res.status === 400 || res.status === 500) {
      const errorMessage = await res.text();
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold flex-col">
                <div className="w-24 h-24 rounded-full bg-gray-100 p-2 mb-4 mx-auto flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-500" />
                </div>
                Profile
              </CardTitle>
              <CardDescription className="text-center text-sm text-gray-500">
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Name</span>
                  <span>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              id="name"
                              placeholder="Name"
                              type="text"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Surname</span>
                  <span>
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              id="surname"
                              placeholder="Surname"
                              type="text"
                              autoComplete="surname"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Username:</span>
                  <span>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              id="username"
                              placeholder="@username"
                              type="username"
                              autoComplete="username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Email:</span>
                  <span>{userData?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Date of Birth:</span>
                  <span>
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "d MMM yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Member Since:</span>
                  <span>
                    {userData?.joinedDate
                      ? userData.joinedDate instanceof Date
                        ? new Date(userData.joinedDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : typeof userData.joinedDate === "string"
                        ? new Date(userData.joinedDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : userData.joinedDate
                      : "Not provided"}
                  </span>
                </div>
              </div>
              <div className="w-full mt-6 space-y-2">
                <Button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
