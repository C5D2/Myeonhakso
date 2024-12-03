import ContentModal, { IContentModalProps } from '@/components/ContentModal';
import classNames from 'classnames';

function ResponsiveModal(props: IContentModalProps) {
  // 드래그 기능 추가
  return (
    <ContentModal
      {...props}
      className={classNames(
        'fixed md:inset-x-0 md:bottom-0 md:h-[90vh] md:w-full md:m-0 md:rounded-t-lg',
        props.className,
      )}
    />
  );
}

export default ResponsiveModal;
