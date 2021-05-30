import React from 'react';
import useUser from '../../lib/useUser';
import Button from '../atoms/Button';
import NoData from '../atoms/icons/NoData';

interface EmptyTasksListProps {
  onClick: () => void;
}

export default function EmptyTasksList({ onClick }: EmptyTasksListProps) {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-center flex-col text-white">
      <div className="w-44 h-44 lg:w-72 lg:h-72">
        <NoData />
      </div>

      <p className="mt-14 mb-10 text-center lg:w-96 font-medium text-lg lg:text-xl">
        Hey {user?.name}, It seems you still don't have to-do's
      </p>

      <Button id="create-new-task" onClick={onClick}>
        Create Your First
      </Button>
    </div>
  );
}
