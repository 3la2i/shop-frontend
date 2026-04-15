import { getCookie } from '../utils/cookies';

// Simple JWT decode function (only decodes payload, doesn't verify signature)
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function checkAuth() {
  const token = getCookie('token');
  if (!token) {
    return false;
  }

  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) {
      return false;
    }
    // Check if token is expired
    if (payload.exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

export function getAuthUser() {
  const token = getCookie('token');
  if (!token) return null;

  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload.id || null,
    username: payload.username || '',
  };
}
