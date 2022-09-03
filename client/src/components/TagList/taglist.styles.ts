import styled from 'styled-components';

export const Wrapper = styled.div`
    .ant-tag {
        padding: 4px 7px !important;
        border-radius: 5px !important;
        font-size: 13px;
    }

    .add-tag-button {
        border: none;
        padding: 4px 12px !important; 
        background-color: var(--darkTeal);
        color: var(--snow);
    }

    .add-tag-button:hover{
        cursor: pointer;
        background-color: var(--lightTeal);
        color: var(--steel);
    }

`;

export const Content = styled.div`
    margin-bottom: 16px;

    .tag-span {
        display: inline-block;
        margin-bottom: 5px;
    }
`;