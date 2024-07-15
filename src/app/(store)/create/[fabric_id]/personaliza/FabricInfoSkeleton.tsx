import Image from 'next/image';

const FabricInfoSkeleton = () => {
  const mockAttributes = [
    {
      title: 'Composición',
      value: '-',
    },
    {
      title: 'Tono',
      value: '-',
    },
    {
      title: 'Nombre de tejido',
      value: '-',
    },
    {
      title: 'Marca',
      value: '-',
    },
  ];

  return (
    <div className="pt-5 grid grid-cols-2 gap-4 sm:gap-8 animate-loading">
      <div className="relative flex-shrink-0 ">
        <Image
          src={'/images/placeholder-image.jpg'}
          fill
          alt="tela"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">-</span>
        <div>
          {mockAttributes.map((att, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 text-xs font-normal gap-8 border-b py-1"
              >
                <span>{att.title}</span>
                <span>{att.value}</span>
              </div>
            );
          })}
        </div>
        <button
          disabled
          className="border border-black p-2 text-xs sm:text-sm text-center"
        >
          Selecciona nueva tela
        </button>
      </div>
    </div>
  );
};

export default FabricInfoSkeleton;
