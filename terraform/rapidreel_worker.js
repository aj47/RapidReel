addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname } = url

  if (pathname === '/transcript' && request.method === 'GET') {
    return handleGetTranscript()
  } else if (pathname === '/update_transcript' && request.method === 'POST') {
    return handleUpdateTranscript(request)
  } else {
    return new Response('Not Found', { status: 404 })
  }
}

async function handleGetTranscript() {
  // Fetch transcript data from KV store
  const transcriptData = await RAPIDREEL_KV.get('transcript', 'json')
  
  if (!transcriptData) {
    return new Response(JSON.stringify({ chunks: [] }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify(transcriptData), {
    headers: { 'Content-Type': 'application/json' }
  })
}

async function handleUpdateTranscript(request) {
  const updatedTranscript = await request.json()
  
  // Store updated transcript in KV
  await RAPIDREEL_KV.put('transcript', JSON.stringify({ chunks: updatedTranscript }))

  return new Response('Transcript updated successfully', { status: 200 })
}