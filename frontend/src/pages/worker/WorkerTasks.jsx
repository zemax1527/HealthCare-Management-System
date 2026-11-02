import React, { useState } from 'react';
import { CheckSquare, Plus, Clock, Search, Filter } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterDropdown } from '../../components/common/FilterDropdown';
import { Modal } from '../../components/common/Modal';

export const WorkerTasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPatient, setNewTaskPatient] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Normal');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.notes.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
      )
    );
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const newTask = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle,
      patientName: newTaskPatient || 'General Duty',
      assignedTo: 'Clara Soto, RN',
      priority: newTaskPriority,
      status: 'Pending',
      dueTime: 'Today at 05:00 PM',
      category: 'Clinical Intake',
      notes: 'Scheduled by nursing station coordinator.',
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskPatient('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search tasks..."
            onClear={() => setSearch('')}
          />
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'All Statuses', value: 'All' },
              { label: 'Pending', value: 'Pending' },
              { label: 'In Progress', value: 'In Progress' },
              { label: 'Completed', value: 'Completed' },
            ]}
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Create Task
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-2xl border transition-all text-xs flex items-start justify-between gap-4 ${
              task.status === 'Completed'
                ? 'bg-slate-50/70 border-slate-200 text-slate-500'
                : 'bg-white border-slate-200/90 hover:border-teal-300 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.status === 'Completed'}
                onChange={() => handleToggle(task.id)}
                className="mt-1 w-4 h-4 rounded text-teal-700 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold text-slate-900 ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </h4>
                  <StatusBadge status={task.status} size="sm" />
                  {task.priority === 'Urgent' && (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-1">{task.notes}</p>
                <div className="flex items-center gap-4 text-slate-400 text-[11px] mt-2">
                  <span>Assigned to: <strong className="text-slate-700">{task.assignedTo}</strong></span>
                  <span>•</span>
                  <span>Due: {task.dueTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Operational Clinical Task"
        maxWidth="md"
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-slate-600 mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Draw fasting blood glucose sample"
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-slate-600 mb-1">Patient Name (Optional)</label>
            <input
              type="text"
              value={newTaskPatient}
              onChange={(e) => setNewTaskPatient(e.target.value)}
              placeholder="e.g. Thomas Mitchell"
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-slate-600 mb-1">Priority</label>
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

