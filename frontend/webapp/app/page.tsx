"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (

        <button
          onClick={() => router.push("/login")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
  );
}