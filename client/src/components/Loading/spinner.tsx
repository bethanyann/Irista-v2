import {Loading} from './spinner.styles';

interface Props {
    title: string
}

const Spinner = ({ title } : Props) => {
    return (
        <div>
            <h2 className="title-style">{title}</h2>
            <Loading/>
        </div>
    );
}

export default Spinner;