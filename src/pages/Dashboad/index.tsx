import React, { useState, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repository } from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRep, setNewRep] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleSubmitForm(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const response = await api.get<Repository>(`/repos/${newRep}`);
    const repository = response.data;
    setRepositories([...repositories, repository]);
    setNewRep('');
  }

  return (
    <>
      <img src={logoImg} alt="GHub Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Digite Ex. facebook/react"
          value={newRep}
          onChange={(e) => setNewRep(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repository>
        {repositories.map((repository) => (
          <a href="#reactjs" key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt={repository.full_name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repository>
    </>
  );
};

export default Dashboard;
