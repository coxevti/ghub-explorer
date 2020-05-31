/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, InputError, Repository } from './styles';
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
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GHubExplorer:repositories',
    );
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleSubmitForm(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRep) {
      setInputError('Digite um repositório');
      return;
    }
    try {
      const response = await api.get<Repository>(`/repos/${newRep}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRep('');
      setInputError('');
    } catch (error) {
      setInputError(
        'Não encontrado o repositório, verifique o nome e tente novamente',
      );
    }
  }

  return (
    <>
      <img src={logoImg} alt="GHub Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Digite Ex. facebook/react"
          value={newRep}
          onChange={(e) => setNewRep(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <InputError>{inputError}</InputError>}
      <Repository>
        {repositories.map((repository) => (
          <Link
            to={`repository/${repository.full_name}`}
            key={repository.full_name}
          >
            <img src={repository.owner.avatar_url} alt={repository.full_name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repository>
    </>
  );
};

export default Dashboard;
