import { getHomeActionType } from 'ActionType';


//Action to get Home
export function getHomeAction() {
    return (dispatch) => {
        return getHome()
            .then((response) => {

                response && response.length && dispatch(getHomeActionType(response));

            }).catch(function (error) {
                console.log('Error obtaining in get Home', error);
            });
    };
}
