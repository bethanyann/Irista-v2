import styled from 'styled-components';

export const Content = styled.div`

    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    height: 100%;

    .photo-horizontal {
        max-height: 93vh;
        max-width: 70vw;
        margin: auto;
        overflow: hidden;
    }

    .photo-vertical {
        /* width: 70%; */
       // height: 100%;
        margin: auto;
    }

    .img-horizontal {
        width: 100%;
        height: 100%;
        margin: auto;
        max-height: 93vh;
    }

    .img-vertical {
        //height: 100%;
        max-height: 90vh;
    }
`; 

export const Metadata = styled.div`
    width: 370px;
    margin-left: 20px;
    padding: 10px 0 10px 10px;
    color: var(--snow);
    margin-top: 20px;

    .info-row {
        max-height: 89vh;
        height: 89vh;
        padding-right: 20px;
    }

    h2 {
        color: var(--snow);
        margin-bottom: 20px;
    }

    h4 {
        color: var(--snow);
    }

    p {
        margin-bottom: 0px;
    }

    .smaller-font {
        font-size: small;
        margin-top: 10px;
        color: #999999;
    }

    .camera-lens {
        font-size: small;
        color: #999999;
    }

    .divider {
        border-bottom: 1px solid var(--steam);
        margin: 15px 0;
    }

    .three-column{
        display: flex;
        justify-content: space-between;
    }

    .two-column{
        display: flex;
        justify-content: space-between;
        align-items: center;
        //margin-top: 10px;
    }
    
    .first-column, .second-column {
        width: 50%;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .icon {
        width: 30px;
        float: left;
        margin-right: 10px
        /* @media screen and (max-width: 720px) {
            width: 40px;
        } */
    }
`;

interface Props {
    color: string
}

export const ColorButton = styled.button<Props>`
        width: 70px;
        height: 70px;
        border: none;
        padding: 0;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-color: ${(props) => props.color};
        cursor: default;

        .colorName {
            color: transparent;
            width:70px;
            height:70px;
            font-size: .6rem;
            font-weight: 500;
        }

        :hover {
            opacity: 0.7;
            .colorName{
                color: ${(props) => setTextColor(props.color)};
                font-size: .6rem;
                font-weight: 500;
            } 
        }
`;

function setTextColor(color: string) {
    const r:number = parseInt(color.slice(1, 3), 16);
    const g:number = parseInt(color.slice(3, 5), 16);
    const b:number = parseInt(color.slice(5, 7), 16);
    
    let rgb = [r,g,b];
    var sum = Math.round((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;

    return (sum > 100) ? '#000000' : '#FFFFFF';
}