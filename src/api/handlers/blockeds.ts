import { Route } from '..';
import * as store from '~/store';
import { sendRealtime } from '../reatime/background';

// #region Add Bocked

interface AddBlockedPayload {
  blocked: store.Blocked;
}

interface AddBlockedRequest {
  added: boolean;
}

const addBlocked: Route<AddBlockedPayload, AddBlockedRequest> = async (req, res, sendError) => {
  try {
    const newBlockeds = await store.addBlocked(req.payload.blocked);
    sendRealtime('updatedBlockeds', newBlockeds);
    res({ added: true });
  } catch (error) {
    sendError(error);
  }
};

// #endregion

// #region Update Blocked

interface UpdateBlockedPayload {
  blockedId: string;
  blocked: Omit<Partial<store.Blocked>, 'id'>;
}
interface UpdateBlockedRequest {
  updated: boolean;
  blocked?: store.Blocked;
}

const updateBlocked: Route<UpdateBlockedPayload, UpdateBlockedRequest> = async (req, res, sendError) => {
  try {
    const newBlockeds = await store.updateBlocked(req.payload.blockedId, req.payload.blocked);
    sendRealtime('updatedBlockeds', newBlockeds);
    res({ updated: true, blocked: newBlockeds.find(b => b.id === req.payload.blockedId) });
  } catch (error) {
    sendError(error);
  }
};

// #endregion

// #region Get All Blockeds

const getAllBlockeds: Route<any, store.Blocked[]> = async (req, res, sendError) => {
  try {
    const blockeds = await store.getAllBlockeds();
    res(blockeds);
  } catch (error) {
    sendError(error);
  }
};

// #endregion

export { addBlocked, updateBlocked, getAllBlockeds };
