interface AuthRepository<T, S> {
  login: (...args: any[]) => Promise<T | S>;
  register: (...args: any[]) => Promise<boolean>;
  show: (...args: any[]) => Promise<T | S>;
  update: (...args: any[]) => Promise<T | S>;
}

export default AuthRepository;
