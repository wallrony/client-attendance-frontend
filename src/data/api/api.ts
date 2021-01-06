import axios from 'axios';
import StorageController from '../static/StorageController';

const baseHeaders = {
  'Content-Type': 'application/json'
};

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: baseHeaders
});

function getAuthHeader() {
  const token = StorageController.getToken();

  if(!token || !token.length) {
    return {};
  }

  return {
    'Authorization': `Token ${token}`,
  }
}


export async function apiGet(path: string) {
  return await api.get(path, {
    headers: {
      ...getAuthHeader(),
    }
  });
}

export async function apiPost(path: string, body: any) {
  return await api.post(path, body, {
    headers: {
      ...getAuthHeader(),
    }
  });
}

export async function apiPut(path: string, body: any) {
  return await api.put(path, body, {
    headers: {
      ...getAuthHeader(),
    }
  });
}

export async function apiDelete(path: string) {
  return await api.delete(path, {
    headers: {
      ...getAuthHeader(),
    }
  });
}
