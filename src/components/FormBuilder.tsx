import React, {  useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes, ItemType } from "./types";
import EditOptionsModal from "./EditOptionsModal";
import setting from "assets/icons/setting.svg";
import trash from "assets/icons/trash.svg";
import upArrow from "assets/icons/up.svg"; // Replace with actual path
import downArrow from "assets/icons/down.svg";
import "./style.css"; // Ensure Tailwind styles are included
import { Condition } from "./types";
import ConditionModal from "./ConditionModal";
import ModalPreview from "./ModalPreview";
import { useNavigate, useParams } from "react-router-dom";
import FormComponent from "./FormComponent";


type FormElement = {
  id: string;
  type: ItemType;
  value?: string;
  options?: string[];
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  conditions?: Condition[];
};



interface FormBuilderProps {
  forms: { id: string; name: string; type: string;  elements: FormElement[] }[];
  setForms: React.Dispatch<React.SetStateAction<{ id: string; name: string; type: string; elements: FormElement[] }[]>>;
  currentForm: { id: string; name: string; type: string ; elements: FormElement[]} | null;
  setCurrentForm: React.Dispatch<React.SetStateAction<{ id: string; name: string; type: string ; elements: FormElement[]} | null>>;

}

const FormBuilder: React.FC<FormBuilderProps> = ({ forms, setForms , currentForm , setCurrentForm 

 }) => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<FormElement | null>(null);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [components, setComponents] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [componentName, setComponentName] = useState('');
  const [componentType, setComponentType] = useState('');

  useEffect(() => {
    if (id) {
      const form = forms.find(form => form.id === id);
      if (form) {
        setComponentName(form.name);
        setComponentType(form.type);
        setFormElements(form.elements || []); // Load existing elements
      }
    } else if (currentForm) {
      setComponentName(currentForm.name);
      setComponentType(currentForm.type);
      setFormElements(currentForm.elements || []); // Load existing elements
    }
  }, [id, forms, currentForm]);

  const handleSave = () => {
    if (id) {
      // Editing an existing form
      setForms(forms.map(form => form.id === id ? { ...form, name: componentName, type: componentType, elements: formElements } : form));
    } else {
      // Adding a new form
      const newForm = { id: (forms.length + 1).toString(), name: componentName, type: componentType, elements: formElements };
      setForms([...forms, newForm]);
      setCurrentForm(newForm); // Update currentForm with the new form
    }
    navigate("/");
  };

  const [, drop] = useDrop({
    accept: Object.values(ItemTypes),
    drop: (item: { type: ItemType }) => {
      setFormElements(prev => [
        ...prev,
        { id: Date.now().toString(), type: item.type },
      ]);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(component => component.id !== id));
  };

  const handleSaveCondition = (condition: Condition) => {
    setConditions(prev => [...prev, condition]);
  };

  const handleUpdateElement = (id: string, value: string) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, value } : element
      )
    );
  };

  const handleUpdateOptions = (id: string, options: string[]) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, options } : element
      )
    );
  };

  const handleDeleteElement = () => {
    if (selectedElementId) {
      setFormElements(prev =>
        prev.filter(element => element.id !== selectedElementId)
      );
      setSelectedElementId(null); // Clear selection after deletion
    }
  };

  const handleSelectElement = (id: string) => {
    setSelectedElementId(id);
  };

  const handleInputChange = (id: string, value: string) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, value } : element
      )
    );
  };

  const handleLabelChange = (id: string, label: string) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, label } : element
      )
    );
  };

  const handleDefaultValueChange = (id: string, defaultValue: string) => {
    setFormElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, defaultValue } : element
      )
    );
  };

  const handleEditOptions = (element: FormElement) => {
    setEditingElement(element);
  };

  const handleCloseEditOptionsModal = () => {
    setEditingElement(null);
  };

  const moveElement = (id: string, direction: "up" | "down") => {
    setFormElements(prev => {
      const index = prev.findIndex(element => element.id === id);
      if (index === -1) return prev;

      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const updatedElements = [...prev];
      const [movedElement] = updatedElements.splice(index, 1);
      updatedElements.splice(newIndex, 0, movedElement);

      return updatedElements;
    });
  };

  return (
    <div className="flex-1 p-4 mb-30 min-h-screen">
      <div
        className="border-8 border-gray-300 min-h-full mt-12 p-10 shadow-l rounded-xl"
        ref={drop}
      >
        <label className="w-24 text-right pr-2">Nom du component :</label>
        <input
          type="text"
          className="p-2 border mb-4 mr-8 border-gray-300 w-800 shadow-l rounded-xl"
          placeholder="Nom du component"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
        />{" "}
        <br></br>
        <label className="w-24 text-right pr-2">Type:</label>
        <select
          className="p-2 border mb-4 mr-8 border-gray-300 w-800 shadow-l rounded-xl"
          value={componentType}
          onChange={(e) => setComponentType(e.target.value)}
        >
          <option> complex </option>
          <option> access </option>
          <option> dossier </option>
          <option selected> patient </option>
          <option> PEC </option>
          <option> prescription </option>
          <option> workflow </option>
        </select>


        {formElements.map((element) => (
          <div
      key={element.id}
      className={`field-container p-2 mb-2 border bg-gray-200 border-gray-200 relative hover:border-gray-400 hover:shadow-md transition duration-200 ${
        selectedElementId === element.id
          ? "border-solid border-2 border-gray-400"
          : ""
      }`}
      onClick={() => handleSelectElement(element.id)}
      style={{ borderRadius: "8px", position: "relative" }}
    >
          
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                {element.type === ItemTypes.H1 && (
                  <>
                    <label className="mr-2">Title1 :</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      value={element.value || ""}
                      onChange={(e) =>
                        handleInputChange(element.id, e.target.value)
                      }
                    />
                  </>
                )}
                {element.type === ItemTypes.H2 && (
                  <>
                    <label className="mr-2">Title2 :</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      value={element.value || ""}
                      onChange={(e) =>
                        handleInputChange(element.id, e.target.value)
                      }
                    />
                  </>
                )}
                {element.type === ItemTypes.TEXT_INPUT && (
                  <>
                    <label className="mr-2">Text field :</label>
                    <input
                      type="text"
                      value={element.label || ""}
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      placeholder="Label"
                      onChange={(e) =>
                        handleLabelChange(element.id, e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="p-2 border border-gray-300 shadow-l rounded-xl ml-2 mt-2"
                      placeholder="Default Value"
                      defaultValue={element.defaultValue || ""}
                      onChange={(e) =>
                        handleDefaultValueChange(element.id, e.target.value)
                      }
                    />
                  </>
                )}

                {element.type === ItemTypes.DATE && (
                  <>
                    <label className="mr-2">Date :</label>
                    <input
                      type="text"
                      value={element.label || ""}
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      placeholder="Label"
                      onChange={(e) =>
                        handleLabelChange(element.id, e.target.value)
                      }
                    />{" "}
                    <br />
                    <input
                      type="date"
                      className="p-2 border border-gray-300 w-60 mt-2 w-80 shadow-l rounded-xl"
                    />
                  </>
                )}
                {element.type === ItemTypes.CHECKBOX && (
                  <input
                    type="checkbox"
                    className="p-2 border border-gray-300 shadow-l rounded-xl"
                  />
                )}
        
                {element.type === ItemTypes.CHECKBOX_GROUP && (
                  <div>
                    <label className="mr-2">Checkbox group :</label>
                    <br></br>
                    <input
                    
                      type="text"
                      value={element.label || ""}
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      placeholder="Label"
                      onChange={(e) =>
                        handleLabelChange(element.id, e.target.value)
                      }
                    />
                    <br></br>
                    {element.options?.map((option, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          className="p-2 m-2 border border-gray-300 shadow-l rounded-xl"
                        />
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                {element.type === ItemTypes.RADIO_GROUP && (
                  <div>
                    <label className="mr-2">Radio group :</label>
                    <br></br>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      value={element.label || ""}
                      placeholder="Label"
                      onChange={(e) =>
                        handleLabelChange(element.id, e.target.value)
                      }
                    />
                    <br></br>
                    {element.options?.map((option, index) => (
                      <div key={index}>
                        <input type="radio" name={element.id} /> {option}
                      </div>
                    ))}
                  </div>
                )}
                {element.type === ItemTypes.SELECT && (
                  <div>
                    <label className="mr-2">List :</label>
                    <br></br>
                    <input
                      type="text"
                      value={element.label || ""}
                      className="p-2 border border-gray-300 shadow-l rounded-xl"
                      placeholder="Label"
                      onChange={(e) =>
                        handleLabelChange(element.id, e.target.value)
                      }
                    />
                    <br />
                    <select className="p-2 border mt-4 border-gray-300 w-80 shadow-l rounded-xl">
                      {element.options?.map((option, index) => (
                        <option key={index} value="select option">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {element.type === ItemTypes.PASSWORD && (
                  <input
                    type="password"
                    className="p-2 border border-gray-300 w-full shadow-l rounded-xl"
                  />
                )}
                {element.type === ItemTypes.FILE_UPLOAD && (
                  <input
                    type="file"
                    className="p-2 border border-gray-300 w-full shadow-l rounded-xl"
                  />
                )}
                {element.type === ItemTypes.MULTI_FILE_UPLOAD && (
                  <input
                    type="file"
                    multiple
                    className="p-2 border border-gray-300 w-full shadow-l rounded-xl"
                  />
                )}
                {element.type === ItemTypes.LINK && (
                  <a
                    href={element.value}
                    className="p-2 text-blue-500 underline hover:text-blue-700 block mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {element.label || "Click here"}
                  </a>
                )}
                {element.type === ItemTypes.GROUP && (
                  <div className="p-2 border border-gray-300">
                    Group Content
                  </div>
                )}
                {element.type === ItemTypes.TOGGLE && (
                  <input
                    type="checkbox"
                    className="p-2 border border-gray-300 shadow-l rounded-xl"
                  />
                )}
              </div>
            </div>
            <div className="absolute top-1 bottom-1 right-3 flex">
              {(element.type === ItemTypes.SELECT ||
                element.type === ItemTypes.RADIO_GROUP ||
                element.type === ItemTypes.CHECKBOX_GROUP) && (
                <button
                  onClick={() => handleEditOptions(element)}
                  className="p-1"
                >
                  <img src={setting} alt="Edit" className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => handleDeleteElement()} className="p-1">
                <img src={trash} alt="Delete" className="w-5 h-5" />
              </button>

              <div className="up-down-icons">
                <button
                  onClick={() => moveElement(element.id, "up")}
                  className="p-1"
                >
                  <img src={upArrow} alt="Move Up" />
                </button>
                <button
                  onClick={() => moveElement(element.id, "down")}
                  className="p-1"
                >
                  <img src={downArrow} alt="Move Down" />
                </button>
              </div>
            </div>{" "} 
          </div>
          
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePreview}
          className="mb-4 mr-4 mt-2 p-2 bg-[#243c5a] text-white rounded-xl hover:shadow-lg"
        >
          Preview form
        </button>

        <button
         onClick={() => setShowConditionsModal(true)}
           className="mb-4 mr-4 mt-2 p-2 bg-[#243c5a] text-white rounded-xl hover:shadow-lg"
        >
          Make conditions
        </button>
      </div>

      {showModal && (
        <ModalPreview
          conditions={conditions}
          onClose={handleCloseModal}
          formElements={formElements}
          onUpdateElement={handleUpdateElement}
          componentName={componentName}
          componentType={componentType}
          formRef={undefined}
          onSave={handleSave}
        />
      )}
{showConditionsModal && (
  <ConditionModal
    onClose={() => setShowConditionsModal(false)}
    onSave={handleSaveCondition}
    formElements={formElements}
  />
)}

{components.map((component) => (
          <FormComponent
            key={component.id}
            id={component.id}
            name={component.name}
            type={component.type}
            onDelete={handleDeleteComponent}
            onEdit={component.onEdit}
          />
        ))}


      {editingElement && (
        <EditOptionsModal
          element={editingElement}
          onClose={handleCloseEditOptionsModal}
          onUpdateOptions={handleUpdateOptions}
        />
      )}

    </div>
  );
};

export default FormBuilder;