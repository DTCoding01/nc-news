export default function TopicsCard({ topic }) {
  return (
    <article>
      <h2>{topic.slug}</h2>
      <h3>{topic.description}</h3>
    </article>
  );
}
