import { Card } from ".";

export function Main() {
  return (
    <main>
      <section>
        <h3>Check who you follow but don't follow you back</h3>
        <form>
          <input placeholder="Github profile..." />
          <button>search</button>
        </form>
      </section>
      <section>
        <span>Here are the profiles you follow but don't follow you back:</span>
        <div>
          <Card></Card>
        </div>
      </section>
    </main>
  );
}
