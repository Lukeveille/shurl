import React from 'react';
import Link from './Link';

const ALL_LINKS = [
  {
    id: '1',
    hash: 'ABC',
    url: 'http://google.com',
    description: 'Google shortlink',
  },
  {
    id: '2',
    hash: 'DEF',
    url: 'http://graph.cool',
    description: 'Graphcool shortlink',
  },
  {
    id: '3',
    hash: 'GHI',
    url: 'http://reactjs.org',
    description: 'ReactJS shortlink',
  },
];

const LinkList = () => {
  return (
    <div>
      {ALL_LINKS.map(link => <Link key={link.id} link={link} />)}
    </div>
  )
};

export default LinkList;