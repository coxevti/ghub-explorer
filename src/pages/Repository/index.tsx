import React from 'react';
import { Link } from 'react-router-dom';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryItem, Issues } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  return (
    <>
      <Header>
        <img src={logoImg} alt="GHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      <RepositoryItem>
        <header>
          <img
            src="https://avatars0.githubusercontent.com/u/28929274?s=200&v=4"
            alt="Rocketseat"
          />
          <div>
            <strong>Rocketseat</strong>
            <p>descricao</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>Forks</strong>
            <span>121</span>
          </li>
          <li>
            <strong>Forks</strong>
            <span>121</span>
          </li>
          <li>
            <strong>Forks</strong>
            <span>121</span>
          </li>
        </ul>
      </RepositoryItem>
      <Issues>
        <Link to="ddsd">
          <div>
            <strong>das</strong>
            <p>da</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
