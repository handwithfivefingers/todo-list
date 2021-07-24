import { MODAL } from './../constant/modal';
export const ShowModal = (data) => {
  return (dispatch) => {
    dispatch({
      type: MODAL.MODAL_SHOW,
    });
    dispatch({
      type: MODAL.MODAL_CHANGE_TITLE,
      payload: {
        data,
      },
    });
  };
};
export const HideModal = () => {
  return (dispatch) =>
    dispatch({
      type: MODAL.MODAL_HIDE,
    });
};
