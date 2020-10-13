export interface TabProps<T = any> {
  title: string;
  data?: T;
  selected?: boolean;
  focused?: boolean;
}

export interface TabsProps {
  children: React.ReactElement<TabProps>[];
  onUserFocus?: (index: number, data?: any) => any;
  onClose?: (index: number, data?: any) => any;
}
