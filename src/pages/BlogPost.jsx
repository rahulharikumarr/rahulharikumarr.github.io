import React from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function BlogPost() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) return <div className="blog-post"><h1>Blog not found.</h1></div>;

  const BlogComponent = React.lazy(blog.component);

  return (
    <React.Suspense fallback={<div className="blog-post"><h1>Loading...</h1></div>}>
      <BlogComponent />
    </React.Suspense>
  );
} 