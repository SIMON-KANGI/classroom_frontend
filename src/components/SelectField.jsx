import React from 'react';

const SelectField = ({ title, options, value, onChange }) => {
  return (
    <div className="select-field">
      <label htmlFor={title} className="block text-gray-700 font-bold mb-2">
        {title}
      </label>
      <select
        id={title}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="" disabled>
          Select {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
