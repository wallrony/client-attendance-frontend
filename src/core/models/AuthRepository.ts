interface AuthRepository<T> {
  login: (...args: any[]) => Promise<T>;
  register: (...args: any[]) => Promise<boolean>;
  show: (...args: any[]) => Promise<T>;
  update: (...args: any[]) => Promise<T>;
}

export default AuthRepository;
