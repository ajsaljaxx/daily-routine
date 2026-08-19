import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Modal from '../../common/Modal';
import {
  UtensilsCrossed,
  Droplets,
  Plus,
  Minus,
  Trash2,
  Clock,
  Flame,
  Coffee,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';

export default function FoodView() {
  const { meals, addMeal, deleteMeal, waterGlasses, updateWater, userProfile } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [category, setCategory] = useState('Breakfast / Morning');
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');

  const targetWater = userProfile?.dailyWaterTarget || 8;
  const totalCalories = meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);

  const getCategoryIcon = (cat) => {
    if (cat.includes('Early')) return Coffee;
    if (cat.includes('Breakfast') || cat.includes('Morning')) return Sun;
    if (cat.includes('Lunch') || cat.includes('Afternoon')) return UtensilsCrossed;
    if (cat.includes('Evening')) return Sunset;
    return Moon;
  };

  const handleSaveMeal = (e) => {
    e.preventDefault();
    if (!food.trim()) return;

    addMeal({
      category,
      food,
      calories: calories ? Number(calories) : 0,
      notes
    });

    setFood('');
    setCalories('');
    setNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="page-content">
      {/* Header & Primary Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Food & Nutrition Tracker
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Fuel your body with wholesome meals and consistent hydration.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ gap: '8px' }}>
          <Plus size={18} />
          <span>Log Meal</span>
        </button>
      </div>

      {/* Top 2 Metric Cards: Hydration & Calories */}
      <div className="grid-2-col" style={{ marginBottom: '24px' }}>
        {/* Water Hydration Card */}
        <div className="aura-card" style={{ background: 'linear-gradient(135deg, rgba(91, 141, 239, 0.1) 0%, rgba(91, 141, 239, 0.04) 100%)', border: '1px solid rgba(91, 141, 239, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                background: '#5B8DEF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(91, 141, 239, 0.3)'
              }}>
                <Droplets size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Daily Water Intake
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Target: {targetWater} Glasses (2.5L)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => updateWater(-1)}
                className="btn btn-secondary btn-icon"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                aria-label="Decrease water"
              >
                <Minus size={14} />
              </button>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#5B8DEF', minWidth: '36px', textAlign: 'center' }}>
                {waterGlasses}
              </span>
              <button
                onClick={() => updateWater(1)}
                className="btn btn-primary btn-icon"
                style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#5B8DEF' }}
                aria-label="Increase water"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Glasses visual row */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '6px 0' }}>
            {Array.from({ length: targetWater }).map((_, idx) => {
              const isFilled = idx < waterGlasses;
              return (
                <div
                  key={idx}
                  onClick={() => updateWater(isFilled ? -1 : 1)}
                  style={{
                    flex: 1,
                    minWidth: '28px',
                    height: '42px',
                    borderRadius: '6px',
                    backgroundColor: isFilled ? '#5B8DEF' : 'var(--bg-secondary)',
                    border: `1px solid ${isFilled ? '#5B8DEF' : 'var(--border-light)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isFilled ? '#FFFFFF' : 'var(--text-muted)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  title={`Glass ${idx + 1}`}
                >
                  💧
                </div>
              );
            })}
          </div>
        </div>

        {/* Calorie & Macro Snapshot */}
        <div className="aura-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Daily Calorie Total
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 14px' }}>
              Estimated total intake today
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {totalCalories.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>kcal</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              • {meals.length} Meals recorded today
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 600 }}>
              • Clean diet balance
            </span>
          </div>
        </div>
      </div>

      {/* Meals Timeline */}
      <div className="aura-card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
          Today's Meals Timeline
        </h3>

        {meals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            No meals logged for today yet. Click "+ Log Meal" above to record what you ate.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
            {meals.map((meal, idx) => {
              const Icon = getCategoryIcon(meal.category);

              return (
                <div
                  key={meal.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary-soft)',
                    color: 'var(--primary-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {meal.category}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Clock size={11} />
                          {meal.time}
                        </span>
                      </div>

                      {meal.calories > 0 && (
                        <span style={{
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(54, 162, 105, 0.12)',
                          color: 'var(--success)'
                        }}>
                          {meal.calories} kcal
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                      {meal.food}
                    </p>

                    {meal.notes && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0 0', fontStyle: 'italic' }}>
                        Note: {meal.notes}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteMeal(meal.id)}
                    className="btn-icon btn-ghost"
                    style={{ width: '30px', height: '30px', color: 'var(--danger)' }}
                    title="Delete meal entry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Meal Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Meal" maxWidth="480px">
        <form onSubmit={handleSaveMeal}>
          <div className="form-group">
            <label>Meal Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Early Morning">Early Morning</option>
              <option value="Breakfast / Morning">Breakfast / Morning</option>
              <option value="Afternoon / Lunch">Afternoon / Lunch</option>
              <option value="Evening">Evening Snack</option>
              <option value="Night / Dinner">Night / Dinner</option>
            </select>
          </div>

          <div className="form-group">
            <label>Food Items & Portions</label>
            <textarea
              rows={2}
              placeholder="e.g. 2 boiled eggs, 2 whole wheat chapatis, tea"
              value={food}
              onChange={e => setFood(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Estimated Calories (kcal, optional)</label>
            <input
              type="number"
              placeholder="e.g. 450"
              value={calories}
              onChange={e => setCalories(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <input
              type="text"
              placeholder="e.g. High protein, clean cooking"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Add Meal Entry
          </button>
        </form>
      </Modal>
    </div>
  );
}
