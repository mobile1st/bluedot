import React from 'react';

const Logo = (props) => (
    <svg width='53' height='53' viewBox='0 0 53 53' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <g filter='url(#filter0_f_392_1252)'>
            <circle cx='26.5' cy='26.5' r='24.5' fill='#6880FF' />
        </g>
        <circle cx='26.5' cy='26.5' r='18.5' fill='#243ECB' />
        <defs>
            <filter
                id='filter0_f_392_1252'
                x='0'
                y='0'
                width='53'
                height='53'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
            >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                <feGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_392_1252' />
            </filter>
        </defs>
    </svg>
);

export default Logo;
