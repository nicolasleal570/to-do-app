import React from 'react';
import Task from '../types/Task';
import Wrapper from '../components/atoms/Wrapper';
import Navbar from '../components/molecules/Navbar';
import EmptyTasksList from '../components/molecules/EmptyTasksList';

interface ToDosPageProps {
  _tasks?: Array<Task>;
}

export default function ToDosPage({ _tasks = [] }: ToDosPageProps) {
  const [tasks] = React.useState<Task[]>(_tasks);

  if (!tasks?.length) {
    return (
      <>
        <Navbar />
        <Wrapper>
          <EmptyTasksList />
        </Wrapper>
      </>
    );
  }

  return <p>Hola mundo</p>;
}
