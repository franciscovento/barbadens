import { AxiosResponse } from 'axios';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const customModal = withReactContent(Swal);

const appModal = customModal.mixin({
  showCancelButton: false,
  showConfirmButton: false,
  showCloseButton: true,
  closeButtonHtml: `<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="carbon:close-outline">
  <path id="Vector" d="M13.5 1.6875C6.91875 1.6875 1.6875 6.91875 1.6875 13.5C1.6875 20.0812 6.91875 25.3125 13.5 25.3125C20.0812 25.3125 25.3125 20.0812 25.3125 13.5C25.3125 6.91875 20.0812 1.6875 13.5 1.6875ZM13.5 23.625C7.93125 23.625 3.375 19.0688 3.375 13.5C3.375 7.93125 7.93125 3.375 13.5 3.375C19.0688 3.375 23.625 7.93125 23.625 13.5C23.625 19.0688 19.0688 23.625 13.5 23.625Z" fill="#645A5C"/>
  <path id="Vector_2" d="M18.0562 19.4062L13.5 14.85L8.94375 19.4062L7.59375 18.0562L12.15 13.5L7.59375 8.94375L8.94375 7.59375L13.5 12.15L18.0562 7.59375L19.4062 8.94375L14.85 13.5L19.4062 18.0562L18.0562 19.4062Z" fill="#645A5C"/>
  </g>
  </svg>
  `,
  customClass: {
    container: 'appModal',
  },
});

const successToast = (message: string, config?: SweetAlertOptions) => {
  return customModal.fire({
    icon: 'success',
    toast: true,
    title: message,
    position: 'top-end',
    timer: 5000,
    showConfirmButton: false,
    customClass: {
      popup: 'appToast',
    },
    ...config,
  });
};

const errorToast = (message: string, config?: SweetAlertOptions) => {
  return customModal.fire({
    icon: 'error',
    toast: true,
    title: message,
    position: 'top-end',
    timer: 5000,
    showConfirmButton: false,
    ...config,
  });
};

interface AsyncModalConfig<T> {
  cb: () => Promise<AxiosResponse<T>>;
}
const appModalAsync = async <T>(config: AsyncModalConfig<T>) => {
  return Swal.fire({
    title: 'Confirmar Pago',
    showCancelButton: true,
    confirmButtonText: 'Generar documento',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        const response = await config.cb();
        return response.data;
      } catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result}`,
        html: JSON.stringify(result),
      });
    }
  });
};

export { appModal, errorToast, successToast };
