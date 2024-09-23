export type ChatItem = {
  id: string;
  shareId: string;
  userQuestion: string;
  botResponse: string;
  products: TProduct[] | null;
  brands: Brand[] | null;
  keywords: string;
  imageUrl?: string;
  timestamp: string;
};