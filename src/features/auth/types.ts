export type LoginResponse = {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  user_roles: string[];
};

export type ValidateTokenResponse = {
  code: string;
  data: {
    status: number;
  };
};

export type User = {
  email: string;
  nicename: string;
  displayName: string;
  roles: string[];
};
