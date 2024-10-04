import { apiClient } from '../apiClient';
import request from 'supertest';
import { app } from '@dddforum/backend/src';

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export const usersApi = {
  new: (input: CreateUserInput) =>
    true ? request(app).post('/users/new').send(input) : apiClient.post('/users/new', input),
};
