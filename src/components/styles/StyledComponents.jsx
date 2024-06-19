import {Skeleton, keyframes, styled} from "@mui/material"
import { Link } from "react-router-dom"
import { gray } from "../../constants/colors"




export const VisuallyHiddenInput=styled('input')({
    border:0,
    clip:'rect(0 0 0 0)',
    height:1,
    margin:-1,
    overflow:'hidden',
    padding:0,
    position:'absolute',
    whiteSpace:'nowrap',
    width:1,
})


export const LinkComponent=styled(Link)`
    text-decoration:none;
    color:black;
    padding:1rem;
    &:hover{
        background-color:#f0f0f0;
    }
`



export const InputBox=styled("input")`
    width:100%;
    height:100%;
    border:none;
    outline:none;
    padding: 0 3rem;
    border-radius:1.5rem;
    background-color:${gray}
`


export const SearchField=styled("input")`
    padding:1rem 2rem;
    width: 20vmax;
    border: none;
    outline: none;
    border-radius: 1.5rem;
    background-color: #f1f1f1;
    font-size: 1.1rem
`



export const ButtonComponent=styled("button")`
    background-color: black;
    border: none;
    outline: none;
    border-radius: 1.5rem;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    color: white;
    &:hover{
        background-color: rgba(0,0,0,0.8);
    }
`

const bounceAnimation=keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
`

export const BouncingSkeleton=styled(Skeleton)(()=>({
    animation: `${bounceAnimation} 2s infinite`
}))