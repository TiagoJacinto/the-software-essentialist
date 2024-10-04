import { app } from '@dddforum/backend/src';
import { apiClient } from '../apiClient';
import request from 'supertest';

export type AddEmailToListResponse = {
  success: true;
  data: any;
  error: {};
};

export const marketingApi = {
  new: (input: { email: string }) =>
    true
      ? request(app).post('/marketing/new').send(input)
      : apiClient.post('/marketing/new', input),
};
