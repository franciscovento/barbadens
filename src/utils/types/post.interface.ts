export interface Post {
  id: number;
  created_at: string;
  slug: string;
  title: string;
  content: string;
  featured_image: string;
  keywords: string[];
  status: number;
  excerpt: string;
}
