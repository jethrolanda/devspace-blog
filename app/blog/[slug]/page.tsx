import CategoryLabel from "@/components/CategoryLabel";
import { getPostBySlug } from "@/lib/mdx";
import Link from "next/link";

interface IParams {
  params: {
    slug: string;
    searchParams: string[];
  };
}

interface IPost {
  frontmatter: {
    title: string;
    category: string;
    date: string;
    cover_image: string;
    author: string;
    author_image: string;
  };
  content: React.ReactNode;
}

export default async function PostPage({ params: { slug } }: IParams) {
  const post = await getPostBySlug(slug);
  const { title, category, date, cover_image, author, author_image } =
    post.frontmatter;

  return (
    <div>
      <Link href={"/blog"}>Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} alt="" className="w-full rounded" />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text mt-2">{post.content}</div>
      </div>
    </div>
  );
}
