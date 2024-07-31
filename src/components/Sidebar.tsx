import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './types';
import TextInputIcon from 'assets/icons/text.svg';
import DateIcon from 'assets/icons/date.svg';
import CheckboxIcon from 'assets/icons/checkbox.svg';
import RadioIcon from 'assets/icons/radio.svg';
import SelectIcon from 'assets/icons/select.svg';
import FileUploadIcon from 'assets/icons/upload.svg';
import GroupIcon from 'assets/icons/group.svg';
import link from 'assets/icons/link.svg';

const Sidebar: React.FC = () => {
  const [{ isDragging: isTextInputDragging }, dragTextInput] = useDrag({
    type: ItemTypes.TEXT_INPUT,
    item: { type: ItemTypes.TEXT_INPUT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isDateDragging }, dragDate] = useDrag({
    type: ItemTypes.DATE,
    item: { type: ItemTypes.DATE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isCheckboxDragging }, dragCheckbox] = useDrag({
    type: ItemTypes.CHECKBOX,
    item: { type: ItemTypes.CHECKBOX },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isCheckboxGroupDragging }, dragCheckboxGroup] = useDrag({
    type: ItemTypes.CHECKBOX_GROUP,
    item: { type: ItemTypes.CHECKBOX_GROUP },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isRadioDragging }, dragRadio] = useDrag({
    type: ItemTypes.RADIO,
    item: { type: ItemTypes.RADIO },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isRadioGroupDragging }, dragRadioGroup] = useDrag({
    type: ItemTypes.RADIO_GROUP,
    item: { type: ItemTypes.RADIO_GROUP },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isSelectDragging }, dragSelect] = useDrag({
    type: ItemTypes.SELECT,
    item: { type: ItemTypes.SELECT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isFileUploadDragging }, dragFileUpload] = useDrag({
    type: ItemTypes.FILE_UPLOAD,
    item: { type: ItemTypes.FILE_UPLOAD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isLinkDragging }, dragLink] = useDrag({
    type: ItemTypes.LINK,
    item: { type: ItemTypes.LINK },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isGroupDragging }, dragGroup] = useDrag({
    type: ItemTypes.GROUP,
    item: { type: ItemTypes.GROUP },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isH1Dragging }, dragH1] = useDrag({
    type: ItemTypes.H1,
    item: { type: ItemTypes.H1 },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isH2Dragging }, dragH2] = useDrag({
    type: ItemTypes.H2,
    item: { type: ItemTypes.H2 },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  

  return (
    <div>
      <h2 className="text-xl font-bold mb-5 text-gray-700 center m-5 ml-40">Form Builder</h2>
      <div className="w-50 h-50 p-7 m-5 border 5px border-gray-300 rounded-xl shadow-l">
        <div className="grid grid-cols-2 gap-6">
          <div ref={dragTextInput} className={`p-4 rounded-xl border bg-gray-200 ${isTextInputDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
              <img
              src={TextInputIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Text Input
          </div>
          <div ref={dragCheckboxGroup} className={`p-4 rounded-xl bg-gray-200 border ${isCheckboxGroupDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={CheckboxIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Checkbox Group
          </div>
          <div ref={dragCheckbox} className={`p-4 rounded-xl border bg-gray-200 ${isCheckboxDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={CheckboxIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Checkbox
          </div>
          <div ref={dragRadioGroup} className={`p-4 rounded-xl border bg-gray-200 ${isRadioGroupDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={RadioIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Radio Group
          </div>
          <div ref={dragRadio} className={`p-4 rounded-xl border bg-gray-200 ${isRadioDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={RadioIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Radio Button
          </div>
            <div ref={dragDate} className={`p-4 rounded-xl border bg-gray-200 ${isDateDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={DateIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Date
          </div>
          <div ref={dragSelect} className={`p-4 rounded-xl border bg-gray-200 ${isSelectDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={SelectIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Select
          </div>
          <div ref={dragFileUpload} className={`p-4 rounded-xl border bg-gray-200 ${isFileUploadDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={FileUploadIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Image Upload
          </div>
          <div ref={dragGroup} className={`p-4 rounded-xl border bg-gray-200 ${isGroupDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={GroupIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            Group
          </div>
          <div ref={dragH1} className={`p-4 rounded-xl border bg-gray-200 ${isH1Dragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={TextInputIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            H1
          </div>
          <div ref={dragLink} className={`p-4 rounded-xl border bg-gray-200 ${isLinkDragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
            <img
              src={link}
              alt="Link"
              className="inline-block w-6 h-6 mr-2"
            />
            Link
          </div>
          <div ref={dragH2} className={`p-4 rounded-xl border bg-gray-200 ${isH2Dragging ? 'opacity-60' : 'cursor-pointer hover:bg-gray-300'}`}>
          <img
              src={TextInputIcon}
              alt="Text Input"
              className="inline-block w-6 h-6 mr-2"
            />
            H2
          </div>

        </div>
      </div>
</div>

  );
};

export default Sidebar;
