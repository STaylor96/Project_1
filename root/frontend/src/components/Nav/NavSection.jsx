export const NavSection = ({children, className, ...props}) => {
    return (
        <section className={className ?? 'nav-section'} {...props}>
            {children}
        </section>
    );
}