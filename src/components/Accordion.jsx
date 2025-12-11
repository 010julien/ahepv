import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.question}</span>
            <span className="accordion-icon">
              {activeIndex === index ? <FaMinus /> : <FaPlus />}
            </span>
          </button>
          <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
            <div className="accordion-content-inner">
              {item.answer}
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .accordion {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .accordion-item {
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .accordion-item:hover {
          box-shadow: var(--shadow-md);
        }

        .accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-lg);
          background: transparent;
          border: none;
          font-family: var(--font-primary);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .accordion-header:hover,
        .accordion-header.active {
          color: var(--color-primary);
        }

        .accordion-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: var(--radius-full);
          background: var(--color-gray-100);
          color: var(--color-primary);
          transition: all var(--transition-base);
        }

        .accordion-header.active .accordion-icon {
          background: var(--color-primary);
          color: var(--color-white);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-base);
        }

        .accordion-content.active {
          max-height: 500px;
        }

        .accordion-content-inner {
          padding: 0 var(--spacing-lg) var(--spacing-lg);
          color: var(--text-secondary);
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default Accordion;
