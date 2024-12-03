const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getRacecarById = async (id: string): Promise<Response> => {
  return fetch(`${apiUrl}/racecars/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getRacecarById,
};