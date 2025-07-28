
export interface Category {
  id: string;
  name: string;
}

export interface Summary {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  coverImageUrl: string;
  summaryText: string;
}
