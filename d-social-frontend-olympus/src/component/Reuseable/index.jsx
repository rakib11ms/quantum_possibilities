import { host } from "@/environment"
import { Grid, TextField, Autocomplete, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const getFileUrl = (path) => {
    return host + path
}
export const TextFieldWrapper = ({ label, placeholder = "", name, value, type = "text", touched,
    errors, handleChange, handleBlur, required = false, disabled = false, ...params }) => {
    return (
        <Grid item container>
            <TextField
                size='small'
                sx={{
                    [`& fieldset`]: {
                        borderRadius: 0.6,
                    }
                }}
                label={label}
                variant="outlined"
                type={type}
                error={Boolean(touched && errors)}
                fullWidth
                helperText={touched && errors}
                name={name}
                placeholder={placeholder}
                onBlur={handleBlur}
                onChange={handleChange}
                value={value}
                required={required}
                disabled={disabled}
                {...params}
            />
        </Grid>
    );
};

export const AutoCompleteWrapper = ({
    minWidth = null, required = false, multiple = false, disableClearable = false, options, value,Tsx={},
    handleChange, label, placeholder, ...params
}) => {

    return (
        <Grid item sx={
            minWidth && {
                minWidth
            }
        }
        >
            <Autocomplete
                fullWidth

                size='small'
                options={options}
                disableClearable={disableClearable}
                value={value}
                multiple={multiple}
                filterSelectedOptions
                renderInput={(rnParams) => (
                    <TextField

                        size="small"
                        fullWidth
                        required={required}
                        {...rnParams}
                        label={label}
                        placeholder={placeholder}
                        sx={Tsx}
                    />
                )}
                onChange={handleChange}
                {...params}
            />
        </Grid>
    )
}

export const DebounceInput = ({ handleDebounce, debounceTimeout, label = '', type = 'text', required = false, disabled = false, sx = {}, ...param }) => {

    const [value, setValue] = useState(undefined);

    useEffect(() => {
        const getData = setTimeout(() => {
            handleDebounce(value);
        }, debounceTimeout);

        return () => clearTimeout(getData);
    }, [value]);

    return (

        <TextField
            {...param}
            size='small'
            sx={{
                [`& fieldset`]: {
                    borderRadius: 0.6,
                },
                ...sx
            }}
            label={label}
            type={type}
            required={required}
            disabled={disabled}
            fullWidth
            onChange={e => setValue(e.target.value)}

        />

    )
}

export const Loader = () => {
    return (
        <Box sx={{
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress />
        </Box>
    )
}