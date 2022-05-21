import axios from 'axios';

export const start = async () => {
  const res = await axios.head('/head');
  return res
};