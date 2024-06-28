module.exports = class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async createUser(req) {
    const { firstName, lastName, email, password } = req.body;
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    return await this.userRepo.persist(user);
  }

  async updateUser(user) {
    return await this.userRepo.merge(user);
  }

  async deleteUser(userId) {
    return await this.userRepo.remove(userId);
  }

  async getUser(userId) {
    return await this.userRepo.get(userId);
  }

  async getUserByEmail(email) {
    return await this.userRepo.getByEmail(email);
  }

  async getUsers() {
    return await this.userRepo.find();
  }
};
