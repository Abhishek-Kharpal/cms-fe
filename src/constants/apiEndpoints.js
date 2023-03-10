export const AUTH_URL = 'http://localhost:8080';
export const BACKEND_URL = 'http://localhost:8000';

export const REGISTER_USER = {
  url: 'api/register',
  method: 'POST',
};

export const LOGIN_USER = {
  url: 'api/login',
  method: 'POST',
};

export const GET_ALL_COLLECTIONS = {
  url: 'api/collections',
  method: 'GET',
};

export const CREATE_COLLECTION = {
  url: 'api/collections',
  method: 'POST',
};

export const GET_ALL_FIELDS = {
  url: 'api/fields',
  method: 'GET',
};

export const DELETE_FIELD_BY_ID = (id) => {
  return {
    url: `api/fields/${id}`,
    method: 'DELETE',
  };
};

export const CREATE_FIELD = {
  url: 'api/fields',
  method: 'POST',
};

export const EDIT_FIELD_BY_ID = (id) => {
  return {
    url: `api/fields/${id}`,
    method: 'PUT',
  };
};

export const GET_ALL_ENTRIES = {
  url: 'api/entry',
  method: 'GET',
};

export const CREATE_ENTRY = {
  url: 'api/entry',
  method: 'POST',
};

export const DELETE_ENTRY_BY_ID = (id) => {
  return {
    url: `api/entry/${id}`,
    method: 'DELETE',
  };
};