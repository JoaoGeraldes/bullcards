import Card from "./Card";

const Start = () => {
  return (
    <>
      <label htmlFor="username">Set your username</label>
      <input id="username" placeholder="username" />
      <Card />
      <button>Start</button>
    </>
  );
};

export default Start;
