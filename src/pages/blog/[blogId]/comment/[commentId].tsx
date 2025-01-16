import { useRouter } from "next/router";

function index() {
  const { query } = useRouter();
  console.log("router", query);
  return (
    <div>
      <h1>
        Halaman dengan blog nomer {query.blogId} comment dengan id
        {query.commentId}
      </h1>
    </div>
  );
}

export default index;
