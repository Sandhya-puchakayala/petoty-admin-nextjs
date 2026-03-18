"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContentPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first sub-item automatically
    router.replace("/content/metaobjects");
  }, [router]);

  return null;
}
