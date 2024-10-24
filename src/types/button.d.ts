export type TButton = {
  text: string;
  onClick?: () => void;
  id?: string;
  type?: 'button' | 'submit';
  opacity?: boolean;
  width?: string;
};
