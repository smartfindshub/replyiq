const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface RefreshApiResponse {
  success: boolean;
  message: string;
  data: {
    user: { id: string; name: string; email: string; role: string };
    accessToken: string;
    refreshToken: string;
  };
}

export async function refreshTokens(): Promise<RefreshApiResponse> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw new Error('Token refresh failed');
  }

  const data: RefreshApiResponse = await response.json();

  localStorage.setItem('accessToken', data.data.accessToken);
  localStorage.setItem('refreshToken', data.data.refreshToken);

  return data;
}
