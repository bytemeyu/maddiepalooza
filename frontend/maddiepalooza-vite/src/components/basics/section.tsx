import { SectionProps } from "../../types/section";
import { twMerge } from "tailwind-merge";

export const Section = (props: SectionProps) => {
    const sectionClasses = 'w-full max-w-4xl p-4 my-5 mx-auto text-center';

    return (
        <section {...props} className={twMerge(sectionClasses, props.className)}>
            {props.children}
        </section>
    )
}