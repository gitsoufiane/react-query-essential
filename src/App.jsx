import React from "react";
import { Pokemon, usePokemon } from "./components/Pokemon";
import { Berry } from "./components/Berry";
import { MyPost } from "./components/MyPost";
import { Post, Posts } from "./components/Posts";
function Count() {
  const { isSuccess, data } = usePokemon();

  return <h3>Pokemon Count : {isSuccess && data.length}</h3>;
}

function App() {
  const [show, setShow] = React.useState(true);
  const [name, setName] = React.useState("");
  const [postId, setPostId] = React.useState(-1);
  return (
    <>
      <button onClick={() => setShow(!show)}>show</button>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <Count />
      {show ? <Pokemon pokemonName={name} /> : null}
      <div>--------------------------------------</div>
      <Berry />
      <MyPost />
      {postId > -1 ? <Post postId={postId} setPostId={setPostId} /> : <Posts setPostId={setPostId} />}
    </>
  );
}

export default App;
