import BounceLoader from 'react-spinners/BounceLoader'

function SpinnerUI() {
    return <BounceLoader 
                color='#36d7b7'
                cssOverride={{
                    margin: "30vh auto"
                }} 
            /> 
}

export default SpinnerUI;