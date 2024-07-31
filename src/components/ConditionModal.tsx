import React, { useState } from 'react';
import { Condition , FormElement  } from './types';



type Props = {
    element: FormElement;
    onClose: () => void;
    onSave: (updatedElement: FormElement) => void;
};

const ConditionModal: React.FC<Props> = ({ element, onClose, onSave }) => {
    const [conditions, setConditions] = useState<Condition[]>(element.conditions || []);

    const handleConditionChange = (index: number, updatedCondition: Condition) => {
        const newConditions = [...conditions];
        newConditions[index] = updatedCondition;
        setConditions(newConditions);
    };

    return (
        <div>
            {/* Render conditions here */}
            {conditions.map((condition, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={condition.field}
                        onChange={(e) =>
                            handleConditionChange(index, { ...condition, field: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={condition.value}
                        onChange={(e) =>
                            handleConditionChange(index, { ...condition, value: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={condition.condition}
                        onChange={(e) =>
                            handleConditionChange(index, { ...condition, condition: e.target.value })
                        }
                    />
                </div>
            ))}
            <button onClick={() => onSave({ ...element, conditions })}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ConditionModal;
