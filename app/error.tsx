"use client";

import { useEffect } from "react";
import { Error } from "@/components/ui/error";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error message="Something went wrong. Please try again later." />;
}