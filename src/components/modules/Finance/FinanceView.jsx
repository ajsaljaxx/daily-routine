import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Modal from '../../common/Modal';
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  Trash2,
  Calendar,
  Tag,
  Target,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function FinanceView() {
  const { finance, updateBalance, addTransaction, deleteTransaction, addSavingsGoal, depositToGoal, deleteSavingsGoal, userProfile } = useApp();
  const currency = userProfile?.currency || '₹';

  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [newBalanceInput, setNewBalanceInput] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Transaction form states
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');
  const [txCategory, setTxCategory] = useState('Food');
  const [txNote, setTxNote] = useState('');

  // Goal form states
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('2026-12-31');
  const [goalCategory, setGoalCategory] = useState('Tech & Work');

  // Deposit state
  const [depositAmount, setDepositAmount] = useState('2000');

  // Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const transactions = finance.transactions || [];

  const spentToday = transactions
    .filter(t => t.date === todayStr && t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalSaved = transactions
    .filter(t => t.type === 'saving')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // Category breakdown calculation
  const categoryTotals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const cat = t.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount || 0);
    });

  const categoryEntries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const handleSaveTx = (e) => {
    e.preventDefault();
    if (!txTitle.trim() || !txAmount) return;

    addTransaction({
      title: txTitle,
      amount: Number(txAmount),
      type: txType,
      category: txCategory,
      note: txNote
    });

    setTxTitle('');
    setTxAmount('');
    setTxNote('');
    setIsTxModalOpen(false);
  };

  const handleSaveGoal = (e) => {
    e.preventDefault();
    if (!goalTitle.trim() || !goalTarget) return;

    addSavingsGoal({
      title: goalTitle,
      targetAmount: Number(goalTarget),
      deadline: goalDeadline,
      category: goalCategory
    });

    setGoalTitle('');
    setGoalTarget('');
    setIsGoalModalOpen(false);
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!selectedGoal || !depositAmount) return;
    depositToGoal(selectedGoal.id, depositAmount);
    setIsDepositModalOpen(false);
  };

  return (
    <div className="page-content">
      {/* Header & Primary Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Personal Finance & Savings
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Maintain conscious spending discipline and build long-term wealth.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setIsGoalModalOpen(true)} style={{ gap: '6px' }}>
            <Target size={16} />
            <span>New Goal</span>
          </button>
          <button className="btn btn-primary" onClick={() => setIsTxModalOpen(true)} style={{ gap: '6px' }}>
            <Plus size={16} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Metrics */}
      <div className="grid-4-col" style={{ marginBottom: '24px' }}>
        <div
          className="aura-card"
          style={{ background: 'var(--grad-card-hero)', color: '#FFFFFF', cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => {
            setNewBalanceInput(String(finance.currentBalance ?? 0));
            setIsBalanceModalOpen(true);
          }}
          title="Click to edit liquid balance"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)' }}>Current Liquid Balance</span>
            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.22)', padding: '2px 7px', borderRadius: 'var(--radius-full)', color: '#FFFFFF', fontWeight: 600 }}>Edit ✎</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', margin: '4px 0' }}>
            {currency}{(finance.currentBalance ?? 0).toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.75)' }}>
            Available funds • Click to update
          </span>
        </div>

        <div className="aura-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Spent Today</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: spentToday > 0 ? 'var(--warning)' : 'var(--text-primary)', margin: '4px 0' }}>
            {currency}{spentToday.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Within daily allocation
          </span>
        </div>

        <div className="aura-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Total Spent This Month</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger)', margin: '4px 0' }}>
            {currency}{totalSpent.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="aura-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Saved This Month</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success)', margin: '4px 0' }}>
            {currency}{totalSaved.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--success)', fontWeight: 600 }}>
            +22% savings rate
          </span>
        </div>
      </div>

      {/* Savings Goals Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PiggyBank size={20} color="var(--primary-royal)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Active Savings Goals
            </h3>
          </div>
        </div>

        {(finance.savingsGoals || []).length === 0 ? (
          <div className="aura-card" style={{ textAlign: 'center', padding: '32px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>No savings goals created yet.</p>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsGoalModalOpen(true)}>Create your first goal</button>
          </div>
        ) : (
          <div className="grid-3-col">
            {(finance.savingsGoals || []).map(goal => {
              const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

              return (
                <div
                  key={goal.id}
                  className="aura-card"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', color: 'var(--primary-royal)', fontWeight: 700, textTransform: 'uppercase' }}>
                          {goal.category || 'Goal'}
                        </span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 0', color: 'var(--text-primary)' }}>
                          {goal.title}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-royal)' }}>
                          {progress}%
                        </span>
                        <button onClick={() => deleteSavingsGoal(goal.id)} className="btn-icon" style={{ color: 'var(--danger)', padding: '4px' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {currency}{goal.currentAmount.toLocaleString('en-IN')}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        of {currency}{goal.targetAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="progress-track" style={{ height: '8px', marginBottom: '12px' }}>
                      <div className="progress-fill" style={{ width: `${progress}%`, background: goal.color || 'var(--grad-royal)' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      <span>Target Date: {goal.deadline}</span>
                      <span>Remaining: {currency}{remaining.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setSelectedGoal(goal);
                      setIsDepositModalOpen(true);
                    }}
                    style={{ width: '100%', marginTop: '14px' }}
                  >
                    + Add Savings Deposit
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Spending Breakdown & Recent Transactions */}
      <div className="grid-2-col">
        {/* Category Breakdown */}
        <div className="aura-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Spending by Category
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categoryEntries.map(([catName, amount]) => {
              const percent = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;

              return (
                <div key={catName}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{catName}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {currency}{amount.toLocaleString('en-IN')} ({percent}%)
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${percent}%`, background: 'var(--grad-royal)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transactions Ledger */}
        <div className="aura-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Recent Transactions
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {transactions.length} entries
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
            {transactions.map(tx => {
              const isIncome = tx.type === 'income';
              const isSaving = tx.type === 'saving';

              return (
                <div
                  key={tx.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      background: isIncome ? 'var(--success-bg)' : isSaving ? 'var(--info-bg)' : 'var(--bg-tertiary)',
                      color: isIncome ? 'var(--success)' : isSaving ? 'var(--info)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isIncome ? <TrendingUp size={16} /> : isSaving ? <PiggyBank size={16} /> : <TrendingDown size={16} />}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tx.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                        <span>{tx.date}</span>
                        <span>• {tx.category}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: isIncome ? 'var(--success)' : isSaving ? 'var(--info)' : 'var(--text-primary)'
                    }}>
                      {isIncome ? '+' : '-'}{currency}{Number(tx.amount).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="btn-icon btn-ghost"
                      style={{ width: '28px', height: '28px', color: 'var(--danger)' }}
                      title="Delete transaction"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <Modal isOpen={isTxModalOpen} onClose={() => setIsTxModalOpen(false)} title="Record Transaction" maxWidth="480px">
        <form onSubmit={handleSaveTx}>
          <div className="form-group">
            <label>Transaction Title</label>
            <input
              type="text"
              placeholder="e.g. Organic Groceries & Vegetables"
              value={txTitle}
              onChange={e => setTxTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount ({currency})</label>
              <input
                type="number"
                placeholder="500"
                value={txAmount}
                onChange={e => setTxAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select value={txType} onChange={e => setTxType(e.target.value)}>
                <option value="expense">Expense (-)</option>
                <option value="income">Income (+)</option>
                <option value="saving">Saving Deposit</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={txCategory} onChange={e => setTxCategory(e.target.value)}>
              <option value="Food">Food & Dining</option>
              <option value="Travel">Travel & Fuel</option>
              <option value="Education">Education & Books</option>
              <option value="Shopping">Shopping & Tech</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills & Subscriptions</option>
              <option value="Work">Freelance / Salary</option>
              <option value="Savings">Savings</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <input
              type="text"
              placeholder="Receipt details or notes..."
              value={txNote}
              onChange={e => setTxNote(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Record Transaction
          </button>
        </form>
      </Modal>

      {/* Add Savings Goal Modal */}
      <Modal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} title="Create Savings Goal" maxWidth="480px">
        <form onSubmit={handleSaveGoal}>
          <div className="form-group">
            <label>Goal Name</label>
            <input
              type="text"
              placeholder="e.g. New M3 MacBook Pro"
              value={goalTitle}
              onChange={e => setGoalTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Target Amount ({currency})</label>
              <input
                type="number"
                placeholder="60000"
                value={goalTarget}
                onChange={e => setGoalTarget(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Target Deadline</label>
              <input
                type="date"
                value={goalDeadline}
                onChange={e => setGoalDeadline(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Tech, Emergency, Travel, Education..."
              value={goalCategory}
              onChange={e => setGoalCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Create Savings Goal
          </button>
        </form>
      </Modal>

      {/* Deposit to Goal Modal */}
      <Modal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} title={`Deposit to ${selectedGoal?.title}`} maxWidth="420px">
        <form onSubmit={handleDeposit}>
          <div className="form-group">
            <label>Deposit Amount ({currency})</label>
            <input
              type="number"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Confirm Deposit
          </button>
        </form>
      </Modal>

      {/* Update Liquid Balance Modal */}
      <Modal isOpen={isBalanceModalOpen} onClose={() => setIsBalanceModalOpen(false)} title="Update Liquid Balance" maxWidth="420px">
        <form onSubmit={(e) => {
          e.preventDefault();
          updateBalance(newBalanceInput);
          setIsBalanceModalOpen(false);
        }}>
          <div className="form-group">
            <label>Current Liquid Balance ({currency})</label>
            <input
              type="number"
              value={newBalanceInput}
              onChange={e => setNewBalanceInput(e.target.value)}
              placeholder="0"
              required
              autoFocus
            />
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '-8px', marginBottom: '16px' }}>
            Set your exact liquid cash/bank balance. Future transactions will adjust from this amount.
          </p>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Save Balance
          </button>
        </form>
      </Modal>
    </div>
  );
}
