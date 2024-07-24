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

export interface PostWithAuthor extends Post {
  company_users: {
    id: string;
    role: string;
    first_name: string;
    last_name: string;
    created_at: string;
  };
}
