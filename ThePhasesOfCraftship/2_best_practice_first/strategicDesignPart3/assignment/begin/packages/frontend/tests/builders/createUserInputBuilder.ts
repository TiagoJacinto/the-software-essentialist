import { CreateUserInput } from '@dddforum/shared/src/api/users';
import { faker } from '@faker-js/faker';

export class CreateUserCommandBuilder {
  private props: CreateUserInput;

  constructor() {
    this.props = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
    };
  }

  public withAllRandomDetails() {
    // Note: You could also use faker.js
    this.withFirstName(faker.person.firstName());
    this.withLastName(faker.person.lastName());
    this.withEmail(faker.internet.email());
    this.withUsername(faker.internet.userName());
    return this;
  }

  public withFirstName(firstName: string) {
    this.props = {
      ...this.props,
      firstName,
    };
    return this;
  }

  public withLastName(lastName: string) {
    this.props = {
      ...this.props,
      lastName,
    };
    return this;
  }

  public withEmail(email: string) {
    this.props = {
      ...this.props,
      email,
    };
    return this;
  }

  public withUsername(username: string) {
    this.props = {
      ...this.props,
      username,
    };
    return this;
  }

  public build() {
    return this.props;
  }
}
