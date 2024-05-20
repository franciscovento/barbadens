import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const customModal = withReactContent(Swal);

const appModal = customModal.mixin({
  showCancelButton: false,
  showConfirmButton: false,
  customClass: {
    title: 'text-text text-xl',
  },
});

export { appModal };
