interface uList {
  map(arg0: (value: any) => any);
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

type UsersState = {
  users: uList[];
};

type UsersAction = {
  type: string;
  user: uList;
  page: number;
  size: number;
  total: number;
};

type DispatchType = (args: usersAction) => usersAction;
