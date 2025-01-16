import { useRouter } from "next/router";
import Link from "next/link";

function index() {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      <h1>Halaman index dengan id {router.query.blogId}</h1>
      <Link href={`/blog/${router.query.blogId}/comment/100`}>
        Menuju halaman comment ke 100
      </Link>
    </div>
  );
}

export default index;
