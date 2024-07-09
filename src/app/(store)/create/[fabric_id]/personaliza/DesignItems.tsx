import {
  getShirtCollarOptions,
  getShirtCuffOptions,
  getShirtPocketOptions,
} from '@/services/api/supabase/design.services';
import SelectCollar from '@/ui/organisms/selectAttribute/selectCollar/SelectCollar';
import SelectCuff from '@/ui/organisms/selectAttribute/selectCuff/SelectCuff';
import SelectPocket from '@/ui/organisms/selectAttribute/selectPocket/SelectPocket';
import SelectSleeve from '@/ui/organisms/selectAttribute/selectSleeve/SelectSleeve';

const DesignItems = async () => {
  const { data: collarOptions, error: collarError } =
    await getShirtCollarOptions();
  const { data: pocketOptions, error: pocketError } =
    await getShirtPocketOptions();
  const { data: cuffOptions, error: cuffError } = await getShirtCuffOptions();

  if (collarError || pocketError || cuffError) {
    return <div>Ocurrió un error, inténtalo de nuevo</div>;
  }

  return (
    <>
      <h3 className="font-semibold pb-4">Características del modelo</h3>
      <div className="flex flex-wrap gap-8">
        <SelectSleeve />
        <SelectCuff cuffOptions={cuffOptions || []} />
        <SelectPocket pocketOptions={pocketOptions || []} />
        <SelectCollar collarOptions={collarOptions || []} />
      </div>
    </>
  );
};

export default DesignItems;
