export type TButton = {
  text: string;
  onClick?: () => void;
  width?: string;
  id?: string;
  type?: 'button' | 'submit';
};
