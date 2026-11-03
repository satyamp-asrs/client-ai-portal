"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    setLoading(false);

    if (result?.error) {
      alert("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border rounded-xl p-6 space-y-4"
      >
        <h1 className="text-3xl font-bold">
          Login
        </h1>

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
          className="w-full bg-black text-white p-3 rounded"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Login"}
        </button>
      </form>

    </main>
  );
}