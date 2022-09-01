import React from 'react';
import TodoList from '../components/TodoList';

export default function Dashboard() {
  return(
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
        <TodoList/>
        </div>
      </div>
    </main>
  );
}