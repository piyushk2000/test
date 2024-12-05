import { useState } from "react";

export type ModalState<ModalNames extends string> = {
  [K in ModalNames]: boolean;
};

export type ModalActions<ModalNames extends string> = {
  [K in ModalNames]: { openModal: () => void; closeModal: () => void };
};

export type UseModals<ModalNames extends string> = (
  names: ModalNames[]
) => [ModalState<ModalNames>, ModalActions<ModalNames>];

export type UseModalsReturn<ModalNames extends string> = [
  ModalState<ModalNames>,
  ModalActions<ModalNames>
];

const useModals = <ModalNames extends string>(
  names: ModalNames[]
): UseModalsReturn<ModalNames> => {
  const [modalState, setModalState] = useState<ModalState<ModalNames>>(
    Object.fromEntries(
      names.map((name) => [name, false])
    ) as ModalState<ModalNames>
  );

  const openModal = (name: ModalNames) => {
    setModalState((prevState) => ({ ...prevState, [name]: true }));
  };

  const closeModal = (name: ModalNames) => {
    setModalState((prevState) => ({ ...prevState, [name]: false }));
  };

  const modalActions: ModalActions<ModalNames> = names.reduce(
    (acc, name) => ({
      ...acc,
      [name]: {
        openModal: () => openModal(name),
        closeModal: () => closeModal(name),
      },
    }),
    {} as ModalActions<ModalNames>
  );

  return [modalState, modalActions];
};

export default useModals;
