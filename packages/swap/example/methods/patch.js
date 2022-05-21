
import axios from 'axios';

export const start = async () => {
  const res = await axios.patch('/patch', {
    req_body: {
      page_num: 0,
      page_size: 10,
      anchor_person_id: '1596093656739662',
    },
  });
  return res
};