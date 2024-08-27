type ModalContent = string | React.ReactNode;

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ModalContent;
  callbackButton: {
    [key: string]: () => void;
  };
}

export interface ModalStore extends ModalState {
  openModal: (state: Partial<ModalState>) => void;
  closeModal: () => void;
}
