import { useRef, useState } from "react";
import { Card, Github, Linkedin, Twitter, Return } from "../components";
import { getAllProfileFollowers, getAllProfileFollowing } from "../util";
import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "../util";
import { RequestError } from "octokit";

export function Homepage() {
  const profileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState({
    status: "",
    message: "",
  });
  const [following, setFollowing] = useState([]);
  const [requestBeenMade, setRequestBeenMade] = useState(false);

  const handleClick = () => {
    saveProfileData();
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    const key = e.key;

    if (key === "enter") {
      saveProfileData();
    }
  };

  const saveProfileData = async () => {
    let profile = "";

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
          const profileFollowersIds = profileFollowers.map(
            (user: any) => user.id
          );
          const profileFollowingIds = profileFollowing.map(
            (user: any) => user.id
          );
          const notInFollowers = profileFollowingIds.filter(
            (id: number) => !profileFollowersIds.includes(id)
          );
          setFollowing(
            profileFollowing.filter((user: any) =>
              notInFollowers.includes(user.id)
            )
          );
        }

        setRequestBeenMade(true);
      }
    } catch (e) {
      interface ErrorResponse {
        status?: string;
        message?: string;
      }

      if (e instanceof RequestError) {
        if (e.response && e.response.data) {
          const err: ErrorResponse = e.response.data;
          setError({
            status: err.status || "",
            message: err.message || "",
          });
        }
      }
    }
  };

  return (
    <div className="homepage">
      <div className="social-media">
        <div className="social-media__item">
          <a target="_blank" href={GITHUB_LINK}>
            <Github />
          </a>
        </div>
        <div className="social-media__item">
          <a target="_blank" href={TWITTER_LINK}>
            <Twitter />
          </a>
        </div>
        <div className="social-media__item">
          <a target="_blank" href={LINKEDIN_LINK}>
            <Linkedin />
          </a>
        </div>
      </div>
      <main className="main">
        <section className="main__search">
          <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleEnter}>
            <input ref={profileRef} placeholder="Github profile..." />
            <button onClick={handleClick}>search</button>
          </form>
          <span>
            Search for a github profile, in the right side will appear all the
            profiles that don’t follow this profile back
          </span>
        </section>
        <section className="main__result">
          {requestBeenMade && following.length > 0 ? (
            <div className="main__result__found">
              <span>Profiles found:</span>
              <div className="main__result__found__cards">
                {following.map((user: any, i) => (
                  <Card
                    profile={{
                      img: user.avatar_url || "",
                      username: user.login,
                    }}
                    key={i}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {!error && requestBeenMade && following.length === 0 && (
                <Return>No profiles were found</Return>
              )}
              {error && (
                <Return>
                  <div className="status">{error.status}</div>
                  <div className="msg">{error.message}</div>
                </Return>
              )}
            </>
          )}
        </section>
      </main>
      <footer className="footer">created by LauraVivan🐼</footer>
    </div>
  );
}
