export type addOfficedefaultValues = {
  name: string | null;
  admins: any[];
};

export const defaultValues: addOfficedefaultValues = {
  name: null,
  admins: []
};


export const getEditDefaultValues = (val: any): addOfficedefaultValues => {
  let admins = val.admins.map((value: any) => {
    return { value: value.id, label: value.name }
  })
  return {
    name: val.group_name,
    admins: admins
  }
}

