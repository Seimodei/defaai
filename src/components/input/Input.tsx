import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


//Styles
import './input.scss';
import { Fragment } from 'react';



interface InputProps {
    placeholder?: string;
    label?: string;
    value?: string;
    type?: string;
    textArea?: boolean;
    rows?: number;
    width?: string;
    hideOutline?: boolean;
    link?: JSX.Element;
    onChange?: (val: string) => void;
}





const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 10,
      position: 'relative',
      border: '1px solid #fff',
      fontSize: 16,
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:focus': {
        boxShadow: `${alpha('#0984e3', 0.25)} 0 0 0 0.2rem`,
        borderColor: '#0984e3'
      },
    },
}));



const InputComponent = (props: InputProps) => {
    return (
        <div className="input">
            <FormControl variant="standard">
                {props.label && (
                    <InputLabel shrink htmlFor="bootstrap-input" className="input-label">
                        <span>{props.label}</span>
                        {props.link && (
                            <Fragment>{props.link}</Fragment>
                        )}
                    </InputLabel>
                )}
                <BootstrapInput 
                    style={{ 
                        width: props.width ? props.width : '400px',
                        backgroundColor: (props.textArea || props.hideOutline) ? '#fff' : '#fcfcfb',
                        border: (!props.textArea && !props.hideOutline) ? '1px solid #ced4da' : 'none',
                        borderRadius: 10
                    }}
                    placeholder={props.placeholder}
                    type={props.type}
                    value={props.value}
                    multiline={props.textArea}
                    rows={props.rows}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </FormControl>
        </div>
    )
}



export default InputComponent;