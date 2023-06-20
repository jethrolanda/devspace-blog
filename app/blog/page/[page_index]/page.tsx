import { getAllPosts } from "@/lib/mdx";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";

interface IParams {
  params: {
    page_index: number;
    searchParams: string[];
  };
}
interface IRes {
  posts: any[];
  currentPage: number;
  numPages: number;
}
export default async function BlogPage({ params: { page_index } }: IParams) {
  const res = await getAllPosts({
    location: "",
    page: Number(page_index) || 1,
    category_name: ""
  });
  const { posts, currentPage, numPages, categories } = res;

  return (
    <>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Pagination numPages={numPages} currentPage={currentPage} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </>
  );
}
