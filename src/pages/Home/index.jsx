import React, { useEffect, useState } from 'react';
import './styles.css'
import Card from '../../components/Card'


function Home() {
  const [user, setUser] = useState();
  const [gitUser, setGitUser] = useState([]);

  async function fetchGitApi () {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    console.log(data);

    const newUser = {
      id: data.id,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio
    }

    setGitUser(prevState => [...prevState, newUser]);
  }


  return (
    <div className="container">
      <header>
        <h1>GitHub users</h1>
      </header>

      <input
      type='text'
      placeholder='Digite o nome de usuário no GitHub'
      onChange={ (e) => setUser(e.target.value)}
      />

      <button onClick={fetchGitApi}>Adicionar</button>

      {
        gitUser.map( user => 
          <Card
            key={user.id}
            name={user.name}
            avatar={user.avatar}
            bio={user.bio}
          />
        )
      }


    </div>
  )
}

export default Home;
