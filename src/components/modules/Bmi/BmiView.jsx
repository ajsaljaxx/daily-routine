import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Scale, Info, TrendingDown, RefreshCw, AlertCircle, Heart } from 'lucide-react';

export default function BmiView() {
  const { bmiData, updateBmi } = useApp();

  const [height, setHeight] = useState(bmiData.heightCm || 175);
  const [weight, setWeight] = useState(bmiData.weightKg || 68.5);
  const [age, setAge] = useState(bmiData.age || 23);
  const [gender, setGender] = useState(bmiData.gender || 'Male');

  // Calculate live BMI
  const heightM = Number(height) / 100;
  const currentBmi = heightM > 0 ? Number((Number(weight) / (heightM * heightM)).toFixed(1)) : 0;

  // Category evaluation
  let category = 'Normal weight';
  let categoryColor = '#36A269';
  let categoryDescription = 'Healthy balanced body mass index range.';
  let gaugePercentage = 50;

  if (currentBmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#5B8DEF';
    categoryDescription = 'Below standard weight. Focus on nutrient-dense calorie surplus.';
    gaugePercentage = 20;
  } else if (currentBmi >= 18.5 && currentBmi < 25) {
    category = 'Normal range';
    categoryColor = '#36A269';
    categoryDescription = 'Optimal healthy weight for longevity and cardiovascular energy.';
    gaugePercentage = 50;
  } else if (currentBmi >= 25 && currentBmi < 30) {
    category = 'Overweight';
    categoryColor = '#F4A340';
    categoryDescription = 'Slightly above ideal range. Focus on clean nutrition and daily activity.';
    gaugePercentage = 75;
  } else {
    category = 'Obese';
    categoryColor = '#E76F72';
    categoryDescription = 'Significantly elevated mass. Consider structured cardiovascular and nutrition consulting.';
    gaugePercentage = 95;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateBmi({
      heightCm: Number(height),
      weightKg: Number(weight),
      age: Number(age),
      gender
    });
  };

  const history = bmiData.history || [];

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Body Mass Index (BMI) & Metrics
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Track healthy physical composition and historical weight trends.
        </p>
      </div>

      {/* Main Grid: Calculator Form & Visual Gauge */}
      <div className="grid-2-col" style={{ marginBottom: '24px' }}>
        {/* Left: Input Form */}
        <div className="aura-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Update Measurements
          </h3>

          <form onSubmit={handleUpdate}>
            <div className="form-row">
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  min="100"
                  max="250"
                  required
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  min="30"
                  max="200"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age (years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  min="10"
                  max="120"
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', gap: '8px' }}>
              <RefreshCw size={16} />
              <span>Update & Record Measurement</span>
            </button>
          </form>
        </div>

        {/* Right: Visual Gauge & Classification Card */}
        <div className="aura-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Calculated BMI Score
              </h3>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: `${categoryColor}22`,
                color: categoryColor
              }}>
                {category}
              </span>
            </div>

            {/* Huge Number */}
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                {currentBmi}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
                kg / m²
              </span>
            </div>

            {/* Visual Gauge Spectrum Bar */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{
                height: '14px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(90deg, #5B8DEF 0%, #36A269 35%, #F4A340 70%, #E76F72 100%)',
                position: 'relative',
                marginBottom: '8px'
              }}>
                {/* Needle Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  left: `${gaugePercentage}%`,
                  transform: 'translateX(-50%)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--text-primary)',
                  boxShadow: 'var(--shadow-md)'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>&lt; 18.5 (Under)</span>
                <span>18.5 - 24.9 (Normal)</span>
                <span>25 - 29.9 (Over)</span>
                <span>30+ (Obese)</span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
              {categoryDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Historical Measurements Chart */}
      <div className="aura-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
          Historical Weight & BMI Progress
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '150px',
          paddingTop: '20px',
          gap: '12px'
        }}>
          {history.map((record, i) => {
            const heightPercent = Math.min(100, (record.weight / 80) * 100);

            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-royal)' }}>
                  {record.weight}kg
                </span>
                <div style={{
                  width: '100%',
                  maxWidth: '42px',
                  height: '90px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: 'var(--grad-royal)',
                    borderRadius: 'var(--radius-xs)'
                  }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)' }}>{record.date}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BMI {record.bmi}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medical Disclaimer Banner */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <AlertCircle size={20} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          <strong>Medical Disclaimer:</strong> Body Mass Index (BMI) is an approximate statistical screening metric calculated from height and weight. It does not account for muscularity, bone density, or individual body composition. It is intended for self-tracking awareness and is not a clinical medical diagnosis.
        </p>
      </div>
    </div>
  );
}
