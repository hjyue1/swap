import axios from 'axios';

export const start = async () => {
  const res = await axios.options('/options');
  return res
};