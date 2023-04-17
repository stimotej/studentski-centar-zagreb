export type Post<Meta extends ObavijestiMeta | PostsMeta | JobsMeta> = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  template: string;
  meta: Meta;
  company: Meta extends JobsMeta ? Company : undefined;
  categories: number[];
  image_url: string;
  author_meta: Meta extends ObavijestiMeta | PostsMeta ? Author : undefined;
  category: Meta extends ObavijestiMeta ? string : undefined;
};

export type Author = {
  ID: string;
  user_nicename: string;
  user_email: string;
  user_registered: string;
  display_name: string;
};

export type CalendarEvent = {
  title: string;
  slug: string;
  permalink: string;
  image: string;
  location: string;
  event_date: string;
  post_type: "obavijesti" | "event";
};

export type Event = {
  title: string;
  slug: string;
  permalink: string;
  image: string;
  location: string;
  dates: string[];
  event_date: string;
  content: string;
  start_showing: string;
  end_showing: string;
  show_always: boolean;
  documents: Document[];
  type: string;
  show_on_slider: boolean;
  is_course: boolean;
};

export type ObavijestiMeta = {
  start_showing: string;
  end_showing: string;
  show_always: boolean;
  event_date: string;
  documents: Document[];
  featured: boolean;
};

export type PostsMeta = {
  ponuda: string;
  radno_vrijeme: string;
  restaurant_info: RestaurantInfo[];
  menu_restaurant_id: number;
  menu_products:
    | {
        dorucak:
          | {
              menu: MenuProduct[] | undefined;
              vege_menu: MenuProduct[] | undefined;
              izbor: MenuProduct[] | undefined;
              prilozi: MenuProduct[] | undefined;
            }
          | undefined;
        rucak:
          | {
              menu: MenuProduct[] | undefined;
              vege_menu: MenuProduct[] | undefined;
              izbor: MenuProduct[] | undefined;
              prilozi: MenuProduct[] | undefined;
            }
          | undefined;
        vecera:
          | {
              menu: MenuProduct[] | undefined;
              vege_menu: MenuProduct[] | undefined;
              izbor: MenuProduct[] | undefined;
              prilozi: MenuProduct[] | undefined;
            }
          | undefined;
      }
    | [];
  menu_date: string;
  price: string;
  stock_status: string;
  allergens: string;
  weight: string;
  start_showing: string;
  end_showing: string;
  show_always: false;
  event_date: string;
  documents: Document[];
  sadrzaj: string;
  kontakt: string;
  radno_vrijeme_blagajni: string;
  lokacija: string;
  image_groups: ImageGroup[];
};

export type JobsMeta = {
  documents: Document[];
  company_id: number;
  company_name: string;
  company_oib: string;
  long_island_id: string;
  allowed_sc: boolean;
  featured: boolean;
  title: string;
  type: number;
  job_type: number;
  city: string;
  work_start: string;
  work_end: string;
  working_hours: string;
  payment_rate: number;
  payment_other: number;
  work_hours: string;
  positions: number;
  active_until: string;
  description: string;
  whyme: string;
  other_description: string;
  contact_student: string;
  contact_sc: string;
  image: string;
  skills: string;
  labels: string;
};

export type MenuProduct = {
  id: number;
  title: string;
  stock: string;
  allergens: string;
  weight: string;
  price: string;
};

export type Company = {
  roles: string[];
  oib_company: string;
  name: string;
  short_name: string;
  id_number: string;
  address: string;
  location: string;
  first_name: string;
  last_name: string;
  oib: string;
  iban: string;
  phone: string;
  mobile: string;
  telefax: string;
  email: string;
  image_url: string;
};

export type ImageGroup = {
  id: number;
  title: string;
  images: {
    id: number;
    url: string;
  }[];
};

export type Document = {
  id: number;
  title: string;
  media_type: string;
  mime_type: string;
  source_url: string;
};

export type Banner = {
  id: number;
  image_url: string;
  banner_url: string;
  title: string;
};

export type Category = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: {
    image_groups: ImageGroup[];
  };
};

export type RestaurantInfo = {
  title: string;
  icon: string;
  order: number;
};
