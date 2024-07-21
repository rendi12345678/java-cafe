"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function AuthNavButtons(): ReactElement {
  const { moveRoute, isAuthenticated, handleLogout, user } = useAppContext();

  return (
    <div className="flex gap-6 max-sm:hidden">
      {!isAuthenticated ? (
        <>
          <Button onClick={() => moveRoute("/auth/login")} size="default">
            Login
          </Button>
          <Button
            onClick={() => moveRoute("/auth/sign-up")}
            size="default"
            variant="outline"
          >
            Sign Up
          </Button>
        </>
      ) : (
        <>
          <>
            {user.role === "admin" && (
              <Button
                onClick={() => moveRoute("/admin/dashboard")}
                size="default"
              >
                Dashboard
              </Button>
            )}
          </>
          <Button onClick={handleLogout} size="default" variant="outline">
            Logout
          </Button>
        </>
      )}
    </div>
  );
}
