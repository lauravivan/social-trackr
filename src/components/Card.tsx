interface CardType {
  profile: {
    img?: string;
    username: string;
  };
}

export function Card({ profile }: CardType) {
  return (
    <article className="card">
      <div className="card__img-container">
        <img src={profile.img} />
      </div>
      <div className="card__profile-container">
        <span className="card__profile-container--username">
          @{profile.username}
        </span>
        <div className="card__profile-container--follow-numbers">
          <span>17 followers</span>
          <span>18 following</span>
        </div>
      </div>
    </article>
  );
}
