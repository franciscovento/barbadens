import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Chip } from '../../materialComponents';

interface Props {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  isNew?: boolean;
  discount?: number;
  fabricType: string;
}
const FabricModalDetail: FC<Props> = ({
  title,
  image,
  description,
  isNew,
  discount,
  price,
  id,
  fabricType,
}) => {
  return (
    <div className="flex flex-col items-start">
      <h4 className="font-semibold capitalize py-4 text-base">{title}</h4>
      <div className="h-[391px] w-full relative">
        <Image
          src={image}
          alt="fabric details"
          className="object-cover rounded-xl w-full h-[391px] "
          width={627}
          height={391}
        />
        <div className="flex items-center gap-1 absolute top-4 left-4">
          {isNew && (
            <Chip
              value="nuevo"
              variant="outlined"
              size="sm"
              className="text-[11px] leading-none border-none bg-white"
            />
          )}
          {discount && (
            <Chip
              value={`-${discount}%`}
              size="sm"
              className="text-[11px] leading-none  "
            />
          )}
        </div>
      </div>
      <div className="py-4 gap-2 w-full flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <span className="block text-xl font-semibold py-1">
            s/. {price}.00
          </span>
          <p className="text-app-text text-xs">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-app-text flex gap-1 items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
            >
              <path
                d="M6.52983 11.4938L6.49475 12.1251L6.51228 12.1261H6.52983V11.4938ZM7.82865 11.0067L7.30257 10.656L7.82865 11.0067ZM6.85453 9.70791L6.23454 9.83191L6.46624 10.9904L7.30162 10.155L6.85453 9.70791ZM5.55571 9.54555L5.17632 10.0514L5.93812 10.6228L6.1691 9.69891L5.55571 9.54555ZM4.41925 9.54555L3.89316 9.19485L3.89316 9.19485L4.41925 9.54555ZM5.88043 11.4938L5.77649 10.8701L5.88043 11.4938ZM5.57285 12.4679V13.1002H6.83739V12.4679H5.57285ZM8.15338 10.5198L7.56759 10.2819L8.15338 10.5198ZM11.4004 8.57147L10.8006 8.37153L11.4004 8.57147ZM8.31573 4.35029L7.69749 4.21781L8.84181 4.70101L8.31573 4.35029ZM6.85453 1.59043L7.00785 0.977023L6.85453 1.59043ZM4.09455 3.05161L3.97057 3.67161L4.4668 3.77084L4.67232 3.3084L4.09455 3.05161ZM2.30866 3.53867L1.80284 3.1593L1.80284 3.1593L2.30866 3.53867ZM2.30866 5.3245L2.55184 5.90814L3.26076 5.61275L2.83472 4.97376L2.30866 5.3245ZM1.00983 8.40925L0.409999 8.6092L1.00983 8.40925ZM4.2569 10.3575L4.85416 10.15L4.2569 10.3575ZM6.52983 12.1261C6.74157 12.1261 7.06186 12.0959 7.37988 12.0036C7.67629 11.9175 8.09906 11.741 8.35473 11.3575L7.30257 10.656C7.30469 10.6528 7.29262 10.672 7.24099 10.7024C7.1899 10.7325 7.1181 10.7628 7.02731 10.7892C6.84202 10.843 6.64279 10.8615 6.52983 10.8615V12.1261ZM7.982 8.93216C7.26003 8.75167 6.68199 8.98628 6.40745 9.26082L7.30162 10.155C7.27779 10.1788 7.26809 10.1813 7.28211 10.1737C7.29297 10.1678 7.31485 10.1577 7.34777 10.149C7.41051 10.1326 7.51907 10.1199 7.6753 10.1589L7.982 8.93216ZM7.47453 9.5839C7.43675 9.39503 7.34898 9.11413 7.19012 8.86278C7.0415 8.62762 6.72637 8.26391 6.20512 8.26391V9.52845C6.14606 9.52845 6.10376 9.50532 6.08937 9.49476C6.08137 9.48889 6.09513 9.49716 6.12118 9.53838C6.14586 9.57743 6.17071 9.62891 6.19232 9.68708C6.21378 9.74486 6.22761 9.79727 6.23454 9.83191L7.47453 9.5839ZM6.20512 8.26391C5.74848 8.26391 5.43527 8.52395 5.25847 8.74774C5.08481 8.96754 4.98625 9.21648 4.94231 9.3922L6.1691 9.69891C6.17262 9.68481 6.18203 9.65491 6.19868 9.61904C6.21525 9.58337 6.2337 9.55319 6.25071 9.53165C6.26806 9.50969 6.27523 9.50762 6.2669 9.51251C6.25424 9.51993 6.2307 9.52845 6.20512 9.52845V8.26391ZM5.93509 9.03975C5.73311 8.88825 5.40886 8.75248 5.08308 8.71127C4.76545 8.67108 4.2213 8.70259 3.89316 9.19485L4.94535 9.89626C4.91865 9.93631 4.87897 9.95745 4.85988 9.96326C4.8514 9.96584 4.87005 9.95894 4.92435 9.96581C4.97582 9.97232 5.03526 9.98829 5.09117 10.0104C5.15105 10.034 5.17934 10.0536 5.17632 10.0514L5.93509 9.03975ZM5.98438 12.1175C5.97567 12.1189 5.99656 12.1158 6.0621 12.1145C6.11821 12.1135 6.18455 12.1142 6.25096 12.1157C6.31658 12.1173 6.37813 12.1197 6.42348 12.1217C6.44605 12.1226 6.46432 12.1235 6.47676 12.1242C6.48297 12.1245 6.48771 12.1247 6.49078 12.1249C6.49231 12.125 6.49343 12.125 6.4941 12.1251C6.49443 12.1251 6.49466 12.1251 6.49477 12.1251C6.49482 12.1251 6.49485 12.1251 6.49485 12.1251C6.49485 12.1251 6.49484 12.1251 6.49482 12.1251C6.49481 12.1251 6.4948 12.1251 6.49479 12.1251C6.49477 12.1251 6.49475 12.1251 6.52983 11.4938C6.5649 10.8625 6.56487 10.8625 6.56485 10.8625C6.56484 10.8625 6.56481 10.8625 6.56479 10.8625C6.56474 10.8625 6.56469 10.8625 6.56463 10.8625C6.56451 10.8625 6.56436 10.8625 6.56418 10.8625C6.56382 10.8624 6.56334 10.8624 6.56275 10.8624C6.56157 10.8623 6.55993 10.8622 6.55785 10.8621C6.55371 10.8619 6.54782 10.8616 6.5404 10.8612C6.52557 10.8605 6.50453 10.8594 6.47889 10.8583C6.42786 10.8561 6.35749 10.8534 6.28106 10.8516C6.15545 10.8486 5.92853 10.8448 5.77649 10.8701L5.98438 12.1175ZM6.83739 12.4679V11.4938H5.57285V12.4679H6.83739ZM8.35473 11.3575C8.3935 11.2993 8.42083 11.2701 8.50943 11.1497C8.57576 11.0596 8.67278 10.9212 8.73917 10.7577L7.56759 10.2819C7.56335 10.2923 7.54556 10.326 7.49095 10.4002C7.46426 10.4365 7.43987 10.4679 7.40576 10.5129C7.37541 10.5529 7.33772 10.6033 7.30257 10.656L8.35473 11.3575ZM8.73917 10.7577C8.85231 10.4792 8.93077 10.1185 8.83981 9.76198C8.73528 9.35231 8.42922 9.04396 7.982 8.93216L7.6753 10.1589C7.69799 10.1646 7.68132 10.165 7.65479 10.139C7.62783 10.1126 7.61715 10.0849 7.61452 10.0746C7.61295 10.0685 7.6177 10.083 7.61229 10.1241C7.60699 10.1644 7.59343 10.2182 7.56759 10.2819L8.73917 10.7577ZM8.15338 11.1521C8.67138 11.1521 9.4461 11.0414 10.1788 10.7046C10.9184 10.3647 11.6685 9.76662 12.0003 8.77141L10.8006 8.37153C10.6128 8.93492 10.183 9.31101 9.65075 9.55561C9.1116 9.80339 8.52256 9.88754 8.15338 9.88754V11.1521ZM12.0003 8.77141C12.3664 7.67301 12.3344 6.66263 11.9851 5.81426C11.6373 4.96965 10.9944 4.3333 10.222 3.94712L9.6565 5.07816C10.183 5.3414 10.5953 5.76034 10.8158 6.29573C11.0347 6.82737 11.0839 7.52169 10.8006 8.37153L12.0003 8.77141ZM10.222 3.94712C9.64627 3.65924 9.16519 3.53743 8.76866 3.54356C8.39143 3.54939 8.00261 3.68012 7.78965 3.99957L8.84181 4.70101C8.73708 4.8581 8.6405 4.81024 8.78821 4.80795C8.91662 4.80597 9.19319 4.84651 9.6565 5.07816L10.222 3.94712ZM8.93397 4.48276C9.03418 4.01505 9.05776 3.29864 8.81681 2.61873C8.56483 1.90769 8.01454 1.22864 7.00785 0.977023L6.70122 2.20383C7.22745 2.33536 7.48892 2.65742 7.6249 3.04112C7.7719 3.45595 7.75961 3.92789 7.69749 4.21781L8.93397 4.48276ZM7.00785 0.977023C5.84373 0.686056 4.99305 0.971059 4.40988 1.47897C3.86938 1.94971 3.61783 2.56742 3.51677 2.79482L4.67232 3.3084C4.78773 3.04873 4.94206 2.69238 5.24039 2.43255C5.49603 2.2099 5.91712 2.00785 6.70122 2.20383L7.00785 0.977023ZM4.21853 2.43161C3.84176 2.35627 3.38301 2.37847 2.97409 2.47628C2.58429 2.56951 2.09821 2.76547 1.80284 3.1593L2.81447 3.91803C2.8458 3.87626 2.98207 3.77458 3.26825 3.70613C3.53531 3.64226 3.80616 3.63873 3.97057 3.67161L4.21853 2.43161ZM1.80284 3.1593C1.47098 3.60179 1.34275 4.07526 1.37337 4.53454C1.40304 4.97954 1.57831 5.36886 1.78259 5.67525L2.83472 4.97376C2.7143 4.79314 2.64604 4.61424 2.63512 4.45043C2.62515 4.30089 2.65928 4.12496 2.81447 3.91803L1.80284 3.1593ZM2.06547 4.74087C1.58998 4.93899 1.03659 5.42881 0.671248 6.07137C0.292355 6.73776 0.0827846 7.62755 0.409999 8.6092L1.60965 8.20931C1.41734 7.63236 1.53248 7.11507 1.77053 6.69639C2.02213 6.25387 2.37792 5.9806 2.55184 5.90814L2.06547 4.74087ZM3.89316 9.19485C3.79767 9.33809 3.70797 9.54162 3.6536 9.75008C3.60227 9.94687 3.55297 10.2579 3.65963 10.5649L4.85416 10.15C4.86407 10.1785 4.86011 10.1873 4.86098 10.1649C4.86178 10.1441 4.8662 10.1114 4.87721 10.0692C4.88799 10.0279 4.90264 9.98677 4.91798 9.95143C4.93432 9.91378 4.94583 9.89553 4.94535 9.89626L3.89316 9.19485ZM3.65963 10.5649C3.80853 10.9936 4.13465 11.402 4.51093 11.6877C4.88246 11.9699 5.41235 12.2128 5.98438 12.1175L5.77649 10.8701C5.68013 10.8862 5.49867 10.85 5.27574 10.6807C5.05756 10.515 4.90611 10.2995 4.85416 10.15L3.65963 10.5649ZM0.409999 8.6092C0.772092 9.69547 1.31413 10.3582 2.07034 10.6972C2.76788 11.0098 3.56457 10.9977 4.2641 10.9897L4.24969 9.72522C3.48805 9.7339 2.98591 9.72177 2.58756 9.54322C2.24788 9.39097 1.89697 9.07127 1.60965 8.20931L0.409999 8.6092Z"
                fill="#787878"
              />
            </svg>
            {fabricType}
          </span>
          <Link className="w-full flex-1" href={`/create/${id}/personaliza`}>
            <button className="w-full sm:w-[221px] rounded-3xl p-2 duration-700 hover:bg-black hover:opacity-60 text-sm px-8 bg-black text-white">
              {' '}
              Seleccionar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FabricModalDetail;