export interface IAdContent {
  id: string;
  type: number
title: string;
subtitle: string;
position: number;
content: IContent[];
is_active: boolean;
created_at: string;
updated_at: string;
type_label: string;
type_color: string;
}

export interface IContent {
    id: string;
    url: string;
    path: string;
    action_url: string;
}
