"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const shorturl = pathname?.substring(1) || ""; // Remove leading slash
      try {
        const headersList = {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
        };
        

        const bodyContent = JSON.stringify({ shorturl });

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/URL`, {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.message) {
          router.push(data.message);
        } else {
          console.log("API response missing 'message'");
        }
      } catch (error) {
        console.log("Failed to fetch redirect URL:", error);
      } finally {
        setIsLoading(false); // Prevent loading spinner if needed
      }
    };

    fetchData();
  }, [pathname, router]);

  return (
    <div>
    </div>
  );
};

export default Page;
