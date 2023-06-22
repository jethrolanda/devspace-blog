import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { sortByDate } from "@/utils";

const POST_PER_PAGE = 3;

export const getAllPosts = async ({
  location,
  page,
  categoryName
}) => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(".mdx", "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", fileName),
        "utf-8"
      );
      const { frontmatter } = await compileMDX({
        source: markdownWithMeta,
        options: { parseFrontmatter: true }
      });

      return {
        slug,
        frontmatter
        // content
      };
    })
  );

  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts =
    location === "home"
      ? posts.sort(sortByDate).slice(0, 6)
      : posts
          .sort(sortByDate)
          .slice(pageIndex * POST_PER_PAGE, (pageIndex + 1) * POST_PER_PAGE);

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === categoryName
  );

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  return {
    posts: categoryName ? categoryPosts : orderedPosts,
    numPages,
    currentPage: page,
    categories: uniqueCategories
  };
};

export const getPostBySlug = async (slug) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );

  const { frontmatter, content } = await compileMDX({
    source: markdownWithMeta,
    options: { parseFrontmatter: true }
  });

  return { frontmatter, content };
};
