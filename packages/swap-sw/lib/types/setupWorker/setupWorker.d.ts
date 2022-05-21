import { SetupWorkerApi } from './glossary';
import { RequestHandler } from '../handlers/RequestHandler';
export declare function setupWorker(...requestHandlers: RequestHandler[]): SetupWorkerApi;
