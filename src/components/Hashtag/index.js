import { useLocation } from 'react-router';

export default function Hashtag() {
  const location = useLocation();
  const { hashtag } = location.state;
  console.log(hashtag);

  return <div>Página de posts da hashtag</div>;
}
