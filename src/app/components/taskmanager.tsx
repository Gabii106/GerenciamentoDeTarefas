import Task from './task';

export default function TaskManager() {
  return (
    <div className="w-full max-w-lg p-4">
      <Task title="Dar banho no cachorro" tasks={['Lavar o pelo', 'Secar o pelo', 'Limpar orelhas', 'Passar perfume']} />
      <Task title="Lista de Compras" tasks={['Feijão', 'Macarrão', 'Arroz', 'Óleo']} />
    </div>
  );
}
