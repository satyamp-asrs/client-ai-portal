"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch("/api/register", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      alert("Registration Successful");

      router.push("/login");
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>
      </form>

    </main>
  );
}