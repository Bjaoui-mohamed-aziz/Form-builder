// types.ts
export const ItemTypes = {
    TEXT_INPUT: 'text_input',
    TEXTAREA: 'textarea',
    H1: 'H1',  
    H2: 'H2',
    DATE: 'date',
    CHECKBOX: 'checkbox',
    CHECKBOX_GROUP: 'checkbox_group',
    RADIO: 'radio',
    LINK: 'LINK',
    RADIO_GROUP: 'radio_group',
    SELECT: 'select',
    PASSWORD: 'password',
    FILE_UPLOAD: 'file_upload',
    MULTI_FILE_UPLOAD: 'multi_file_upload',
    GROUP: 'group',
    TOGGLE: 'toggle',
    BUTTON: 'button',
  } as const;
  
  export type ItemType = typeof ItemTypes[keyof typeof ItemTypes];
  
  export interface FormElement {
    id: string;
    type: ItemType; 
    value?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    options?: string[];
    conditions?: Condition[];
    
  }

  export type Condition = {
    field: string;
    value: string;
    condition: string;
};
