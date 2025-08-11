import React from "react";
// import { CourseSummery } from "@/types/course-summary.interface";
import  BlogPostCard  from "./blog-post-card";
import { BlogPostSummery } from "@/types/blog-post-summery.interface";

type BlogPostCardListProps = {
  posts: BlogPostSummery[];
};

export const BlogPostCardList: React.FC<BlogPostCardListProps> = ({
  posts,
}) => {
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
      {posts?.map((post) => (
        <BlogPostCard key={`blog-post-${post.slug}`} {...post} />
      ))}
    </div>
  );
};
