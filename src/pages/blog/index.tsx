import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Blog() {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      <h1>halaman blog</h1>
      <Link href="/blog/100/comment/100">Menuju halaman comment ke 100</Link>
    </div>
  );
}

export default Blog;

// localhost:3000/blog/comment
// buatlah folder dengan nama comment di dalam blog folder
// buatlah file dengan nama comment di dalam blog folder

// localhost:3000/blog/100
// localhost:3000/blog/1000/comment/1000
