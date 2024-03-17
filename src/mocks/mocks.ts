import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

const baseUrl = 'http://myserver.com/api';

export const worker = setupWorker(

  // 1. Signup endpoint
  http.post(`${baseUrl}/signup`, ({ request, params, cookies }) => {
    console.log('Mock server signup endpoint');
    return HttpResponse.json(
      {
        message: 'Signup successful, Please check your email.',
      },
      {
        status: 200,
        statusText: 'Signup successful',
      },
    )
  }),

  // other endpoints
);
