const DropdownItem = ({ children, ...props }) => {

    return (
        <div className="w-full text-left px-4 py-3 text-textDark hover:bg-accentLight hover:text-accentDark active:bg-textDark/55 active:text-white/45 hover:font-bold transition-all first:rounded-t-lg last:rounded-b-lg cursor-pointer first:border-b last:border-none last:border-t border-b border-accentDark" {...props} >
            {children}
        </div>
    )
}

export default DropdownItem