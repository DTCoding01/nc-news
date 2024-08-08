import "../../css/components/TopicsCard.scss";
export default function TopicsCard({ topic }) {
  return (
    <article className="topic-card">
      <h2>{topic.slug}</h2>
      <h3>{topic.description}</h3>
    </article>
  );
}
