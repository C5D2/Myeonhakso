export interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  callbackButton: Record<string, () => void>;
}

export interface ModalStore extends ModalState {
  openModal: (state: Partial<ModalState>) => void;
  closeModal: () => void;
}