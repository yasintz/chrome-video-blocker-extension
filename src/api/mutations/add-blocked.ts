import { createApi } from '..';
import { Blocked } from '~/store';

interface AddBlockedPayload extends Blocked {}

interface AddBlockedRequest {
  isAdded: boolean;
}

const addBlockedMutation = createApi<AddBlockedPayload, AddBlockedRequest>('add-blocked-mutation');

addBlockedMutation.listen((req, res) => {});

export { addBlockedMutation };
