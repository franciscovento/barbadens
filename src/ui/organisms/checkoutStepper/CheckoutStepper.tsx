'use client';
import { Step, Stepper, Typography } from '@material-tailwind/react';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const path = usePathname();

  const steps = useMemo(() => {
    return {
      0: 'personaliza',
      1: 'medidas',
      2: 'checkout',
    };
  }, []);

  useEffect(() => {
    if (path.includes(steps[0])) {
      setActiveStep(0);
    } else if (path.includes(steps[1])) {
      setActiveStep(1);
    } else if (path.includes(steps[2])) {
      setActiveStep(2);
    }
  }, [path, steps]);

  return (
    <div className="w-full py-4 px-8">
      <Stepper activeStep={activeStep} lineClassName="h-[5px]">
        <Step className="h-[26px] w-[26px]">
          <CustomStep
            title="Paso 1"
            description="Crea tu estilo"
            isActive={
              path.includes(steps[0]) ||
              path.includes(steps[1]) ||
              path.includes(steps[2])
            }
          />
        </Step>
        <Step className="h-[26px] w-[26px]">
          <CustomStep
            title="Paso 2"
            description="Toma tus medidas"
            isActive={path.includes(steps[1]) || path.includes(steps[2])}
          />
        </Step>
        <Step className="h-[26px] w-[26px]">
          <CustomStep
            title="Paso 3"
            description="Confirma el pedido"
            isActive={path.includes(steps[2])}
          />
        </Step>
      </Stepper>
    </div>
  );
}

export default CheckoutStepper;

interface CustomStepProps {
  title: string;
  description: string;
  isActive: boolean;
}
const CustomStep: FC<CustomStepProps> = ({ title, description, isActive }) => {
  return (
    <div className="absolute -bottom-[2.5rem] w-max text-center ">
      <Typography
        style={{
          fontWeight: isActive ? 'bold' : 'normal',
        }}
        variant="h6"
        className="text-[11px] xs:text-xs"
        color={isActive ? 'black' : 'gray'}
      >
        {title}
      </Typography>
      <Typography
        style={{
          fontWeight: isActive ? 'bold' : 'normal',
        }}
        variant="h6"
        color={isActive ? 'black' : 'gray'}
        className="text-[11px] xs:text-xs"
      >
        {description}
      </Typography>
    </div>
  );
};
