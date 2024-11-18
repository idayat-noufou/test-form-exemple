import {isEmpty} from "lodash";


export const FormError = (props) => {
    const {error} = props;
    if (!isEmpty(error)){
        return <p className="text-red-700">{error}</p>
    }
}