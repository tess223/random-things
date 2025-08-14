import service from './index.js';

export const getMoods = () => {
  return service({
    url: '/moods',
    method: 'get',
  });
};

export const addMood = (data) => {
  return service({
    url: '/moods',
    method: 'post',
    data,
  });
};

export const deleteMood = (id) => {
  return service({
    url: `/moods/${id}`,
    method: 'delete',
  });
};