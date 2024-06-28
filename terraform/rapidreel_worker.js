function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname } = url

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders()
    });
  }

  if (pathname === '/transcript' && request.method === 'GET') {
    return handleGetTranscript()
  } else if (pathname === '/update_transcript' && request.method === 'POST') {
    return handleUpdateTranscript(request)
  } else {
    return new Response('Not Found', { status: 404, headers: corsHeaders() })
  }
}

async function handleGetTranscript() {
  console.log('Fetching transcript data from KV store...');
  const transcriptData = await RAPIDREEL_KV_PREVIEW.get('transcript');
  
  console.log('Raw fetched transcript data:', transcriptData);

  let parsedData;
  try {
    parsedData = JSON.parse(transcriptData);
    console.log('Parsed transcript data:', parsedData);
  } catch (error) {
    console.error('Error parsing transcript data:', error);
  }

  if (!parsedData) {
    console.log('Transcript data is null or undefined.');
    return new Response(JSON.stringify([]), {
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify(parsedData), {
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' }
  })
}

async function handleUpdateTranscript(request) {
  const updatedTranscript = await request.json()
  
  console.log('Updated transcript data:', updatedTranscript);

  // Store the updatedTranscript directly without wrapping it in another object
  await RAPIDREEL_KV_PREVIEW.put('transcript', JSON.stringify(updatedTranscript))
  
  const verifyData = await RAPIDREEL_KV_PREVIEW.get('transcript')
  console.log('Verified stored transcript data:', verifyData);

  return new Response('Transcript updated successfully', { status: 200, headers: corsHeaders() })
}