
import axios from 'axios';

export const start = async () => {
  const res = await axios.delete('/delete', {id: 1});
  return res
};