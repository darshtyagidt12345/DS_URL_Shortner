"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState(null);

  // Fetch data from API
  async function hitAPI() {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getURL(s)`,
        { method: "POST" }
      );
      const text = await req.text();
      setData(JSON.parse(text)); // Expecting { urls: [...] }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  useEffect(() => {
    hitAPI();
  }, []);

  // Loading state
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-600 text-lg animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg min-h-screen">
      <table className="min-w-[calc(100vw-52px)] divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Short URL
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Original URL
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.urls.length === 0 ? (
            <tr>
              <td
                colSpan={2}
                className="px-4 py-2 text-center text-sm text-gray-500"
              >
                No URLs found.
              </td>
            </tr>
          ) : (
            data.urls.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-blue-600 underline break-words">
                  <Link href={item.shorturl} target="_blank">
                    {`${process.env.NEXT_PUBLIC_HOST==""?"http://localhost:3000":process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}
                  </Link>
                </td>
                <td className="px-4 py-2 text-sm text-blue-600 underline break-words">
                  <Link
                    href={item.url}
                    target="_blank"
                  >
                    {item.url}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
