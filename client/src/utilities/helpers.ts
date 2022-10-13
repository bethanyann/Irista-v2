
//use for session storage
export const isPersistedState = (stateName: string) : any => {
    //gets item from session storage with the name that is passed in
    const sessionState = sessionStorage.getItem(stateName.toString());
    return sessionState && JSON.parse(sessionState);
}