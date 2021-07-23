import { MODAL } from './../constant/modal';
export const ShowModal = (title) => {
  return (dispatch) => {
    dispatch({
      type: MODAL.MODAL_SHOW,
    });
    dispatch({
      type: MODAL.MODAL_CHANGE_TITLE,
      payload: title,
    });
  };
};
export const HideModal = () => {
  return (dispatch) =>
    dispatch({
      type: MODAL.MODAL_HIDE,
    });
};
