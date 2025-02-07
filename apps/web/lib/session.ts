'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify, SignJWT } from 'jose';
import { authFetch } from './authFetch';
import { BACKEND_URL } from './constants';
import { Role } from './type';

export type Session = {
  user: {
    id: string;
    name: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expireAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload as Session;
  } catch (error) {
    console.error('Failed to verify the session: ', error);
    redirect('/auth/signin');
  }
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get('session')?.value;

  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error('Session not found');

  const newPayload: Session = {
    user: { ...payload.user },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}

export async function deleteSession() {
  const res = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: 'POST',
  });

  if (res.ok) {
    (await cookies()).delete('session');
    redirect('/');
  } else {
    console.log(res);
  }
}
