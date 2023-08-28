export type equipment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  order: number;
  name: string;
  maker: string[];
  about: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  generation?: number;
  category: string[];
  variety?: string;
  owning?: number;
};
