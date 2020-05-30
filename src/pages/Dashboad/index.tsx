import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repository } from './styles';
import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="GHub Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form>
      <input type="text" placeholder="Digite usuario/repositorio" />
      <button type="submit">Pesquisar</button>
    </Form>
    <Repository>
      {[1, 2, 3, 4].map((item) => (
        <a href="#reactjs" key={item}>
          <img
            src="https://avatars0.githubusercontent.com/u/6412038?s=200&v=4"
            alt="React Community"
          />
          <div>
            <strong>reactjs/reactjs.org</strong>
            <p>The React documentation website https://reactjs.org/</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      ))}
    </Repository>
  </>
);

export default Dashboard;
