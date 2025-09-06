
const Cross = ({ size = 24, strokeWidth = 2, ...props }) => {
    return (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props} >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

export default Cross