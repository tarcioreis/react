import React, { useEffect, useState } from 'react';
import './styles.css'
import Card from '../../components/Card'


function Home() {

  // create state for reflecting changes on the user interface
  const [studentName, setName] = useState();
  const [students, setStudent] = useState([]);
  const [gitUser, setGitUser] = useState({name: '', avatar: ''});
  
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    // ... spread operator
    setStudent(prevState => [...prevState, newStudent]);
    // ['rodrigo']
    // [['rodrigo'], amanda]
    // ... spread operator -> [rodrigo, amanda]
  }

  // useEffect is called on first rendering page.
  // [] It's an array dependencies. Empty means useEffect will be called single time
  // [] Store states
  useEffect(() => {

    async function fetchData () {
      const response = await fetch("https://api.github.com/users/tarcioreis");
      const data = await response.json();
      console.log(data);
      setGitUser({
        name: data.name,
        avatar: data.avatar_url
      });
    }

    fetchData();
  }, [])

  return (
    // <> it's a fragment to wrapper all elements.
    <div className='container'>

      <header>
        <h1>Lista de presença</h1>

        <div>
          <strong> {gitUser.name} </strong>
          <img src={gitUser.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input type="text"
      placeholder="Digite o nome"
      onChange={ (e) => setName(e.target.value) }
      />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      
      {
        students.map( (student) => 
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        )
      }
      
    </div>
  )
}

export default Home;
