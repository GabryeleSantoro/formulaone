"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "lucide-react";
import { User as UserModel } from "@/lib/models/users";

import ChangePasswordModal from "@/components/change-pass-modal";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeletionWarning } from "@/components/deletion-warning";
import toast from "react-hot-toast";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const paramsObj = useParams<{ id: string }>();
  const id = paramsObj?.id || params.id;

  const [userData, setUserData] = useState<UserModel>();

  useEffect(() => {
    // Fetch user data based on the ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log("User data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle account deletion
  async function handleDeleteAccount() {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      toast.success("Account deleted successfully.");
      window.location.href = "/api/auth/logout";
    } else {
      const errorData = await res.json();
      toast.error(
        errorData.error || "Failed to delete account. Please try again."
      );
    }
  }

  return (
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
              <span className="font-medium">Full Name:</span>
              <span>
                {userData?.name} {userData?.surname}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Username:</span>
              <span>{userData?.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Email:</span>
              <span>{userData?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Date of Birth:</span>
              <span>
                {userData?.dob
                  ? userData.dob instanceof Date
                    ? new Date(userData.dob).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : typeof userData.dob === "string"
                    ? new Date(userData.dob).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : userData.dob
                  : "Not provided"}
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
          <div className="flex flex-col w-full mt-6 space-y-2 gap-2">
            <a
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 text-center"
              href={`/dashboard/profile/edit/${id}`}
            >
              Edit Profile
            </a>
            <ChangePasswordModal userId={parseInt(id)} />
            {/* <button
              onClick={handleDeleteAccount}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200"
            >
              Delete Account
            </button> */}
            <DeletionWarning onConfirm={handleDeleteAccount} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
