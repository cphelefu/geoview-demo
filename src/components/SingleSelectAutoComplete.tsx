import Autocomplete from '@mui/material/Autocomplete';
import { Box, TextField } from '@mui/material';
import { ListOptionType } from '../types';
import _ from 'lodash';


interface PillsAutoCompleteProps {
  options: ListOptionType[];
  value?: any;
  onChange?: (value: any) => void;
  label: string;
  placeholder?: string;
  applyGrouping?: boolean;
}

export default function SingleSelectComplete(props: PillsAutoCompleteProps) {

  const { options, value, onChange, label, placeholder,applyGrouping = false } = props;

  const handleOnChange = (event: React.ChangeEvent<{}>, newValue: ListOptionType| null) => {
    if(newValue === null) {
      onChange?.(null);
      return;
    } else {
      onChange?.(newValue.value);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
    <Autocomplete
      size="small"
      options={_.orderBy(options, ['group', 'title'], ['asc', 'asc'])}
      disableClearable
      value={options.find((option) => option.value === value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.title}
      groupBy={applyGrouping ? ((option) => option.group ?? 'Others') : undefined}
      onChange={handleOnChange}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
    </Box>
  );
}