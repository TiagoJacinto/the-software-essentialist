import { CreateUserInput } from '@dddforum/shared/src/api/users';
import { testRegistrationFeature } from '@dddforum/shared/tests/features/testRegistrationFeature';
import { CreateUserCommandBuilder } from '../builders/createUserInputBuilder';
import { api } from '@dddforum/shared/src/api';

testRegistrationFeature('@frontend', (test) => {
  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
    let createUserInput: CreateUserInput;
    let createUserResponse: any = {};
    let addEmailToListResponse: any = {};

    given('I am a new user', async () => {
      createUserInput = new CreateUserCommandBuilder().withAllRandomDetails().build();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      createUserResponse = await api.users.new(createUserInput);
      addEmailToListResponse = await api.marketing.new({ email: createUserInput.email });
    });

    then('I should be granted access to my account', async () => {
      const { data, success, error } = createUserResponse.body;
      // Result Verification
      expect(success).toBeTruthy();
      expect(error).toBeUndefined();
      expect(data!.id).toBeDefined();
      expect(data!.email).toEqual(createUserInput.email);
      expect(data!.firstName).toEqual(createUserInput.firstName);
      expect(data!.lastName).toEqual(createUserInput.lastName);
      expect(data!.username).toEqual(createUserInput.username);
    });

    and('I should expect to receive marketing emails', () => {
      const { success } = addEmailToListResponse.body;
      expect(createUserResponse.status).toBe(201);
      expect(success).toBeTruthy();
    });
  });

  test('Successful registration without marketing emails accepted', ({
    given,
    when,
    then,
    and,
  }) => {
    let createUserInput: CreateUserInput;
    let createUserResponse: any = {};
    let addEmailToListResponse: any;

    given('I am a new user', () => {
      createUserInput = new CreateUserCommandBuilder().withAllRandomDetails().build();
    });

    when('I register with valid account details declining marketing emails', async () => {
      createUserResponse = await api.users.new(createUserInput);
    });

    then('I should be granted access to my account', () => {
      const { data, success, error } = createUserResponse.body;
      // Result Verification
      expect(success).toBeTruthy();
      expect(error).toBeUndefined();
      expect(data!.id).toBeDefined();
      expect(data!.email).toEqual(createUserInput.email);
      expect(data!.firstName).toEqual(createUserInput.firstName);
      expect(data!.lastName).toEqual(createUserInput.lastName);
      expect(data!.username).toEqual(createUserInput.username);
    });

    and('I should not expect to receive marketing emails', () => {
      expect(addEmailToListResponse).toBeUndefined();
    });
  });

  test('Invalid or missing registration details', ({ given, when, then, and }) => {
    let createUserInput: CreateUserInput;
    let createUserResponse: any = {};

    given('I am a new user', () => {
      createUserInput = new CreateUserCommandBuilder().build();
    });

    when('I register with invalid account details', async () => {
      createUserResponse = await api.users.new(createUserInput);
    });

    then('I should see an error notifying me that my input is invalid', () => {
      const { success, error } = createUserResponse.body;
      expect(success).toBeFalsy();
      expect(error).toEqual('ValidationError');
    });

    and('I should not have been sent access to account details', () => {});
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    const userInputs: CreateUserInput[] = [];
    const createUserResponses: any[] = [];

    given('a set of users already created accounts', async (table) => {
      for (const row of table) {
        const userInput = new CreateUserCommandBuilder()
          .withFirstName(row.firstName)
          .withLastName(row.lastName)
          .withEmail(row.email)
          .withUsername(row.username)
          .build();

        userInputs.push(userInput);
      }

      for (const userInput of userInputs) {
        await api.users.new(userInput);
      }
    });

    when('new users attempt to register with those emails', async () => {
      for (const userInput of userInputs) {
        createUserResponses.push(await api.users.new(userInput));
      }
    });

    then('they should see an error notifying them that the account already exists', () => {
      for (const response of createUserResponses) {
        const { success, error } = response.body;
        expect(success).toBeFalsy();
        expect(error).toEqual('EmailAlreadyInUse');
      }
    });

    and('they should not have been sent access to account details', () => {});
  });

  test('Username already taken', ({ given, when, then, and }) => {
    const userInputs: CreateUserInput[] = [];
    const createUserResponses: any[] = [];

    given(
      'a set of users have already created their accounts with valid details',
      async (table) => {
        for (const row of table) {
          const userInput = new CreateUserCommandBuilder()
            .withFirstName(row.firstName)
            .withLastName(row.lastName)
            .withEmail(row.email)
            .withUsername(row.username)
            .build();

          userInputs.push(userInput);
        }

        for (const userInput of userInputs) {
          await api.users.new(userInput);
        }
      }
    );

    when('new users attempt to register with already taken usernames', async (table) => {
      for (const row of table) {
        const userInput = new CreateUserCommandBuilder()
          .withFirstName(row.firstName)
          .withLastName(row.lastName)
          .withEmail(row.email)
          .withUsername(row.username)
          .build();

        createUserResponses.push(await api.users.new(userInput));
      }
    });

    then('they see an error notifying them that the username has already been taken', () => {
      for (const response of createUserResponses) {
        const { success, error } = response.body;
        expect(success).toBeFalsy();
        expect(error).toEqual('UserNameAlreadyTaken');
      }
    });

    and('they should not have been sent access to account details', () => {});
  });
});
