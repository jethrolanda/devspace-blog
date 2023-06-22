import { getAllPosts } from "@/lib/mdx";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
 
export default async function CategoryPage({
  params: { category_name: categoryName }
} ) {
  const res = await getAllPosts({
    location: "home",
    page: 1,
    categoryName
  });
  const { posts, categories } = res;
  return (
    <>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {categoryName}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </>
  );
}
