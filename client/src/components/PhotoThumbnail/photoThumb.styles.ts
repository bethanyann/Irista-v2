import styled from 'styled-components';

export const Wrapper = styled.div`

    margin-right: 5px;
    margin-bottom: 5px; 

    @media screen and (max-width: 768px){
        display:flex;
        align-items:center;
    }
`;

export const CheckboxContainer = styled.div`
    position: relative;
    max-width: 300px;

    input {
        position: absolute;
        bottom: 0;
        color: white;
        text-align: left;
    }
`;

export const Thumbnail = styled.img`
    height: 150px;
    width: auto;
    //max-width: 400px;
    transition: all 0.3s; //transition on hover
    object-fit: cover; //center the image and make it fit into the thumbnails
    //border-radius: 20px; //rounded corners 
    animation: animateThumb 0.5s;

        :hover {
            opacity: 0.7;
            cursor: pointer;
        }

        @keyframes animateThumb {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
`;