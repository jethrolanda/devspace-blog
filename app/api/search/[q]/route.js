import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

// interface IPost {
//   frontmatter: {
//     title: string;
//     excerpt: string;
//     category: string;
//   };
// }

export async function GET(req, {params}) {
  let posts;
  if (process.env.NODE_ENV === "production") {
  } else {
    const files = fs.readdirSync(path.join("posts"));

    posts = await Promise.all(
      files.map(async (fileName) => {
        const slug = fileName.replace('.mdx', '');
        const markdownWithMeta = fs.readFileSync(
          path.join("posts", fileName),
          "utf-8"
        );
        const { frontmatter } = await compileMDX({
          source: markdownWithMeta,
          options: { parseFrontmatter: true }
        });

        return {
          frontmatter,
          slug
        };
      })
    );
  }
  
  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(params.q) != -1 ||
      excerpt.toLowerCase().indexOf(params.q) != -1 ||
      category.toLowerCase().indexOf(params.q) != -1
  );
  
  return Response.json({results});
}
