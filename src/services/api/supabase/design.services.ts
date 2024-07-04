import { ShirtDesign } from '@/stores';
import { createClient } from '@/utils/supabase/client';
import { Collar, Cuff, Design } from '@/utils/types/design.interface';

const supabase = createClient();
async function getShirtCuffOptions() {
  const { data, error } = await supabase
    .from('shirt_cuffs')
    .select('*')
    .returns<Cuff[]>();
  return {
    data,
    error,
  };
}

async function getShirtCollarOptions() {
  const { data, error } = await supabase
    .from('shirt_collars')
    .select('*')
    .returns<Collar[]>();
  return {
    data,
    error,
  };
}

async function getShirtPocketOptions() {
  const { data, error } = await supabase
    .from('shirt_pockets')
    .select('*')
    .returns<Cuff[]>();
  return {
    data,
    error,
  };
}

async function getShirtDesigns() {
  const { data, error } = await supabase.from('shirt_designs').select('*');
  return {
    data,
    error,
  };
}

async function getShirtDesign(
  design: Pick<
    ShirtDesign,
    'shirt_collar_id' | 'shirt_cuff_id' | 'shirt_pocket_id' | 'sleeve_type'
  >
) {
  const { shirt_cuff_id } = design;
  if (shirt_cuff_id === null) {
    const { data, error } = await supabase
      .from('shirt_designs')
      .select('*')
      .eq('sleeve_type', design.sleeve_type)
      .eq('shirt_collar_id', design.shirt_collar_id)
      .eq('shirt_pocket_id', design.shirt_pocket_id)
      .is('shirt_cuff_id', null)
      .returns<Design[]>();

    return {
      data,
      error,
    };
  }
  const { data, error } = await supabase
    .from('shirt_designs')
    .select('*')
    .eq('sleeve_type', design.sleeve_type)
    .eq('shirt_collar_id', design.shirt_collar_id)
    .eq('shirt_pocket_id', design.shirt_pocket_id)
    .eq('shirt_cuff_id', design.shirt_cuff_id)
    .returns<Design[]>();
  return {
    data,
    error,
  };
}

export {
  getShirtCollarOptions,
  getShirtCuffOptions,
  getShirtDesign,
  getShirtDesigns,
  getShirtPocketOptions,
};
