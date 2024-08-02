import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#9B51E0',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#9B51E0',
    },
});

interface CustomSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const SwitchComponent: React.FC<CustomSwitchProps> = ({ label, checked, onChange }) => {
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    const handleLabelClick = () => {
        onChange(!checked);
    };

    return (
        <Box display="flex" alignItems="center">
            <CustomSwitch
                checked={checked}
                onChange={handleSwitchChange}
                color="primary"
            />
            <Typography variant="body1" sx={{ color: '#fff', marginLeft: '8px', cursor: 'pointer' }} onClick={handleLabelClick}>
                {label}
            </Typography>
        </Box>
    );
};

export default SwitchComponent;
