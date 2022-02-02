import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';




interface ButtonProps {
    text?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
};



const ColorButton = styled(LoadingButton)(({ theme }) => ({
    color: '#fff',
    backgroundColor: '#42af69',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: '#42af69',
    },
}));


const Btn = (props: ButtonProps) => {
    return (
        <ColorButton 
            variant='contained'
            disableRipple
            loading={props.loading}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.text}
        </ColorButton>
    )
}



export default Btn;