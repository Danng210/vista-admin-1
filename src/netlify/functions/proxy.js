import fetch from 'node-fetch';

export async function handler(event) {
  const tipo = event.queryStringParameters.tipo || 'productos';
  const categoria = event.queryStringParameters.categoria || '';
  const nombre = event.queryStringParameters.nombre || '';

  let url = `https://mipaginaprueba.rf.gd/api/${tipo}.php`;

  // Armar la query string según el tipo
  if (tipo === 'productos') {
    url += `?categoria=${encodeURIComponent(categoria)}`;
  } else if (tipo === 'buscar_productos') {
    url += `?nombre=${encodeURIComponent(nombre)}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
