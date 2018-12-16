import SvgIcon from "@material-ui/core/es/SvgIcon/SvgIcon";
import React from "react";

export const AddFlower = props => (
    <SvgIcon {...props}>
        fill="#fff"
        <path fill="none" d="M0 0h20v20H0V0z"/>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </SvgIcon>
);