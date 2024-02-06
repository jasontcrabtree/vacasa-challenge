export type RepositoryItemType = {
  id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
};

export type ApiResType = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<RepositoryItemType>;
};

export type AccordionItemType = {
  id: string;
  title: string;
  content: string;
};
