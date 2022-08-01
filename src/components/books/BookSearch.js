export const BookSearch = ({ setterFunction }) => {
    return (
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms" />
        
    )
}