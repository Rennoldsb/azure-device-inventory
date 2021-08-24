import Axios from 'axios';

const accessToken = sessionStorage.getItem('msGraphToken');
const bearer = `Bearer ${accessToken}`;

export async function callMsGraphGet(apiEndpoint) {
  const res = await Axios.get(apiEndpoint, {
    headers: {
      Authorization: bearer,
    },
  });
  return res.data;
}
