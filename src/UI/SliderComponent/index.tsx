import React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import {FontOnest} from "@/fonts";

const CustomSlider = styled(Slider)({
    color: '#9B51E0',
    height: 8,
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: 'inherit',
        },
    },
    '& .MuiSlider-track': {
        height: 8,
        borderRadius: 4,
    },
    '& .MuiSlider-rail': {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D3D3D3',
    },
});

interface CustomSliderProps {
    title: string;
    value: number;
    onChange: (value: number) => void;
    leftLabel?: string;
    rightLabel?: string;
    min?: number;
    max?: number;
    options?: string[];
}

interface ValueLabelComponentProps {
    children: React.ReactElement;
    value: number;
    open: boolean;
    options: string[];
}

const ValueLabelComponent: React.FC<ValueLabelComponentProps> = ({children, value, open, options}) => {
    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={options[value]}>
            {children}
        </Tooltip>
    );
};

const SliderComponent: React.FC<CustomSliderProps> = ({
                                                          title,
                                                          value,
                                                          onChange,
                                                          leftLabel,
                                                          rightLabel,
                                                          min = 0,
                                                          max = 100,
                                                          options
                                                      }) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            onChange(newValue);
        }
    };

    return (
        <Box sx={{
            width: '100%',
            margin: '0 auto',
            padding: '0 10px',
            textAlign: 'center',
            borderRadius: '10px',
            position: 'relative'
        }}>
            <Typography variant="subtitle1" gutterBottom
                        sx={{color: '#ffffff80', textAlign: 'left', marginBottom: '15px', fontFamily: FontOnest.style}}>
                {title}
            </Typography>
            <CustomSlider
                value={value}
                onChange={handleSliderChange}
                aria-labelledby="continuous-slider"
                min={options ? 0 : min}
                max={options ? options.length - 1 : max}
                step={options ? 1 : undefined}
                components={options ? {
                    ValueLabel: (props) => <ValueLabelComponent {...props} options={options}/>
                } : undefined}
                valueLabelDisplay="auto"
            />
            <Box display="flex" justifyContent="space-between" sx={{marginTop: '-10px'}}>
                <Typography variant="body2" sx={{color: '#fff', fontFamily: FontOnest.style}}>
                    {leftLabel}
                </Typography>
                <Typography variant="body2" sx={{color: '#fff', fontFamily: FontOnest.style}}>
                    {rightLabel}
                </Typography>
            </Box>
            {options && (
                <Typography
                    variant="body2"
                    sx={{
                        color: '#fff',
                        position: 'relative',
                        top: '-45px', fontFamily: FontOnest.style
                    }}
                >
                    {options[value]}
                </Typography>
            )}
        </Box>
    );
};

export default SliderComponent;
