import React from "react";
import Image from "next/image";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 "></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
