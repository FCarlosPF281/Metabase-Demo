export interface CollectionHistoryItem {
  id: number | 'root' | 'personal' | string;
  title: string;
}

export interface SelectedItem {
  id: number | string;
  model: 'dashboard' | 'card';
  name?: string;
  title?: string;
  display_name?: string;
}

export interface MetabaseItem {
  id?: number | 'root' | 'personal' | string;
  model?: 'dashboard' | 'card' | 'collection';
  name?: string;
  title?: string;
  display_name?: string;
  [key: string]: any;
}
