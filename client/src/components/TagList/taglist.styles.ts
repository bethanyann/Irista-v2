import styled from 'styled-components';

export const Wrapper = styled.div`
    .add-tag-button {
        border: none;
        padding: 3px 12px;
        background-color: var(--darkTeal);
        color: var(--snow);
    }

    .add-tag-button:hover{
        cursor: pointer;
        background-color: var(--lightTeal);
        color: var(--slate);
    }
`;

export const Content = styled.div`
    margin-bottom: 16px;

    .tag-span {
        display: inline-block;
        margin-bottom: 5px;
    }
`;