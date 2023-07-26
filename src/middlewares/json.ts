import http from 'http';

export interface IncomingMessageWithBody<T> extends http.IncomingMessage {

  params?: { [key: string]: string };
  body?: T | null;
}

export async function json<T>(req:IncomingMessageWithBody<T>, res: http.ServerResponse){
  const buffers:Buffer[] = []
  for await (const chunk of req){
    buffers.push(chunk)
  } 
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString()) 

  } catch (error) {
    req.body = null
  }

  res.setHeader('Content-Type', 'application/json' )
}
