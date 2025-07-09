import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function Random() {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <Link to={`/random/${blog.slug}`} className="blog-card" key={blog.slug}>
          <h2>{blog.title}</h2>
          <p>{blog.preview}</p>
        </Link>
      ))}
    </div>
  );
} 