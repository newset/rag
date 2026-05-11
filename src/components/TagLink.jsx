import { Link } from 'react-router-dom';

export default function TagLink({ tag }) {
  return (
    <Link to={`/tag/${encodeURIComponent(tag)}`} className="tag-pill">
      {tag}
    </Link>
  );
}