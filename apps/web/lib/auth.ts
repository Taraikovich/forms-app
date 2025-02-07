'use server';

import { redirect } from 'next/navigation';

import { BACKEND_URL } from './constants';
import { FormState, SigninFormSchema, SignupFormSchema } from './type';
import { createSession, updateTokens } from './session';
import { json } from 'stream/consumers';

export async function signUp(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    redirect('/auth/signin');
  } else {
    return {
      message:
        response.status === 409
          ? 'The user is already existed!'
          : response.statusText,
    };
  }
}

export async function signIn(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    await createSession({
      user: {
        id: result.id,
        name: result.name,
        role: result.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    redirect('/');
  } else {
    return {
      message:
        response.status === 401 ? 'Invalid Credentials' : response.statusText,
    };
  }
}

export async function refreshToken(oldRefreshToken: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) throw new Error('Faild to refresh token!');

    const { accessToken, refreshToken } = await response.json();

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update`,
      {
        method: 'POST',
        body: JSON.stringify({ accessToken, refreshToken }),
      }
    );

    if (!updateRes.ok) throw new Error('Failed to update the tokens!');

    return accessToken;
  } catch (error) {
    console.error('Refresh token faild: ', error);
    return null;
  }
}
