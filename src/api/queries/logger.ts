import { createApi } from '..';

interface LoggerPayload {
  message: string;
}

interface LoggerRequest {
  isLogged: boolean;
}

const loggerApi = createApi<LoggerPayload, LoggerRequest>('logger');

loggerApi.listen((req, res) => {
  if (req.payload.message.includes('no-console')) {
    res({ isLogged: false });
  } else {
    console.log(req.payload.message);

    res({ isLogged: true });
  }
});

export { loggerApi };
