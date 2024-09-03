import { useRef, useState } from "react";
import { Card } from ".";
import { getAllProfileFollowers, getAllProfileFollowing } from "../util";

export function Main() {
  const profileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState([]);

  const handleClick = () => {
    saveProfileData();
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    const key = e.key;

    if (key === "enter") {
      saveProfileData();
    }
  };

  const saveProfileData = async () => {
    let profile = '';

    if (profileRef && profileRef.current) {
      profile = profileRef.current.value;
    }

    try {
      if (profile) {
        const profileFollowers = await getAllProfileFollowers(profile);
        const profileFollowing = await getAllProfileFollowing(profile);

        if (profileFollowers.length === 0) {
          setFollowing([]);
        } else {
          const profileFollowersIds = profileFollowers.map((user: any) => user.id);
          const profileFollowingIds = profileFollowing.map((user: any) => user.id);
          const notInFollowers = profileFollowingIds.filter((id: number) => !profileFollowersIds.includes(id));
          setFollowing(profileFollowing.filter((user: any) => notInFollowers.includes(user.id)));
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  return (
    <main className="content">
      <section className="content__profile-enter">
        <h3>Check who you follow but don't follow you back</h3>
        <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleEnter}>
          <input ref={profileRef} placeholder="Github profile..." />
          <button onClick={handleClick}>search</button>
        </form>
      </section>
      <section className="content__profiles-found">
        <span>Here are the profiles you follow but don't follow you back:</span>
        {error && <div>{error}</div>}
        {following.length > 0 && <div className="content__profiles-found--cards">
          {following.map((user: any, i) => <Card profile={{
            username: user.login
          }} key={i}/>)}
        </div>}
        {following.length === 0 && <div>There's no profile that you follow but doesn't follow you back</div>}
      </section>
    </main>
  );
}
